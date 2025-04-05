"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.signin = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const generateToken = id => {
  return _jsonwebtoken.default.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

// Signup
const signup = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  try {
    const existingUser = await _User.default.findOne({
      email
    });
    if (existingUser) return res.status(400).json({
      message: "User already exists"
    });
    const user = await _User.default.create({
      name,
      email,
      password
    });
    res.status(201).json({
      message: "User created successfully",
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

// Signin
exports.signup = signup;
const signin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    const user = await _User.default.findOne({
      email
    });
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({
      message: "Invalid credentials"
    });
    res.status(200).json({
      message: "Logged in successfully",
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};
exports.signin = signin;