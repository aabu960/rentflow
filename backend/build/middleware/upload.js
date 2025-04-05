"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerStorageCloudinary = require("multer-storage-cloudinary");
var _cloudinary = _interopRequireDefault(require("../config/cloudinary.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Cloudinary storage settings
const storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary.default,
  params: {
    folder: 'blog-images',
    // Change folder name if needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'] // Allowed file formats
  }
});
const upload = (0, _multer.default)({
  storage
});
var _default = exports.default = upload;