"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyRole = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({
    message: "Access Denied"
  });
  try {
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(403).json({
      message: "Invalid Token"
    });
  }
};

// Role-Based Access Control (RBAC)
exports.verifyToken = verifyToken;
const verifyRole = function () {
  for (var _len = arguments.length, allowedRoles = new Array(_len), _key = 0; _key < _len; _key++) {
    allowedRoles[_key] = arguments[_key];
  }
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Forbidden"
      });
    }
    next();
  };
};
exports.verifyRole = verifyRole;