"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Signup
router.post('/signup', async (req, res) => {
  const {
    username,
    email,
    password,
    role
  } = req.body;
  try {
    const existingUser = await _User.default.findOne({
      email
    });
    if (existingUser) return res.status(400).json({
      message: 'User already exists'
    });
    const newUser = new _User.default({
      username,
      email,
      password,
      role
    });
    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await _User.default.findOne({
      email
    });
    if (!user) return res.status(404).json({
      message: 'User not found'
    });
    const isPasswordValid = await _bcryptjs.default.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({
      message: 'Invalid credentials'
    });
    console.log('User role before token signing:', user.role); // Debugging role

    const token = _jsonwebtoken.default.sign({
      id: user._id,
      role: user.role
    }, process.env.JWT_SECRET,
    // Replace with your secret
    {
      expiresIn: '1h'
    });

    // Send token and role in the response
    res.status(200).json({
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    });
  }
});
var _default = exports.default = router;