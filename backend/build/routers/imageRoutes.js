"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _upload = _interopRequireDefault(require("../middleware/upload.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/upload', _upload.default.single('image'), (req, res) => {
  try {
    res.json({
      imageUrl: req.file.path
    }); // Cloudinary returns the image URL
  } catch (error) {
    res.status(500).json({
      error: 'Image upload failed'
    });
  }
});
var _default = exports.default = router;