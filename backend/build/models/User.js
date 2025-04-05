"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UserSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "owner", "admin"],
    default: 'user' // Default role
  }
}, {
  timestamps: true
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await _bcryptjs.default.genSalt(10);
  this.password = await _bcryptjs.default.hash(this.password, salt);
  next();
});
var _default = exports.default = _mongoose.default.model('User', UserSchema);