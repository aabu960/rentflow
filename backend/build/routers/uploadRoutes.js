"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _cloudinary = require("cloudinary");
var _multerStorageCloudinary = require("multer-storage-cloudinary");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Configure Multer-Cloudinary Storage
const storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary.v2,
  params: {
    folder: 'uploads',
    // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
  }
});
const upload = (0, _multer.default)({
  storage
});

// Image Upload Route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({
    message: 'No file uploaded'
  });
  res.json({
    message: 'Image uploaded successfully',
    imageUrl: req.file.path // Cloudinary URL
  });
});
var _default = exports.default = router;