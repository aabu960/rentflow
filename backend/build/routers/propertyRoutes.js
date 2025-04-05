"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Property = _interopRequireDefault(require("../models/Property.js"));
var _multer = _interopRequireDefault(require("multer"));
var _authMiddleware = require("../middleware/authMiddleware.js");
var _cloudinary = require("cloudinary");
var _streamifier = _interopRequireDefault(require("streamifier"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Multer memory storage (for Cloudinary uploads)
const storage = _multer.default.memoryStorage();
const upload = (0, _multer.default)({
  storage
}).array("images", 5);

// 🟢 Get All Properties (Public)
router.get("/", async (req, res) => {
  try {
    const properties = await _Property.default.find().populate("owner", "username");
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error Fetching Properties:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// 🔵 Get Single Property
router.get("/:id", async (req, res) => {
  try {
    if (!_mongoose.default.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid property ID"
      });
    }
    const property = await _Property.default.findById(req.params.id).populate("owner", "username role");
    if (!property) return res.status(404).json({
      message: "Property not found"
    });
    res.status(200).json(property);
  } catch (err) {
    console.error("Error Fetching Property:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// 🟣 Create Property (Owner Only)
router.post("/", _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)("owner"), upload, async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => new Promise((resolve, reject) => {
        const stream = _cloudinary.v2.uploader.upload_stream({
          folder: "properties"
        }, (error, result) => error ? reject(error) : resolve(result.secure_url));
        _streamifier.default.createReadStream(file.buffer).pipe(stream);
      }));
      imageUrls = await Promise.all(uploadPromises);
    }
    const newProperty = new _Property.default({
      ...req.body,
      owner: req.user.id,
      images: imageUrls,
      isApproved: false
    });
    await newProperty.save();
    res.status(201).json({
      message: "Property created successfully",
      property: newProperty
    });
  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// 🔴 Update Property (Owner Only)
router.put("/:id", _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)("owner", "admin"), upload, async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body to inspect the data
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => new Promise((resolve, reject) => {
        const stream = _cloudinary.v2.uploader.upload_stream({
          folder: "properties"
        }, (error, result) => error ? reject(error) : resolve(result.secure_url));
        _streamifier.default.createReadStream(file.buffer).pipe(stream);
      }));
      imageUrls = await Promise.all(uploadPromises);
      console.log("Uploaded Image URLs:", imageUrls); // Log uploaded image URLs
    }
    const updateData = {
      ...req.body
    };

    // Ensure owner ID is valid (if provided in the update request)
    if (updateData.owner) {
      if (!_mongoose.default.Types.ObjectId.isValid(updateData.owner)) {
        return res.status(400).json({
          error: "Invalid owner ID format"
        });
      }
    }
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }
    console.log("Update Data:", updateData); // Log the data that will be updated

    const updatedProperty = await _Property.default.findOneAndUpdate({
      _id: req.params.id,
      owner: req.user.id
    }, updateData, {
      new: true,
      runValidators: true
    });
    if (!updatedProperty) return res.status(404).json({
      message: "Property not found or unauthorized"
    });
    res.status(200).json({
      message: "Property updated successfully",
      updatedProperty
    });
  } catch (err) {
    console.error("Update Property Error:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// 🟠 Delete Property (Owner or Admin)
router.delete("/:id", _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)("owner", "admin"), async (req, res) => {
  try {
    const property = await _Property.default.findById(req.params.id);
    if (!property) return res.status(404).json({
      message: "Property not found"
    });
    if (req.user.role === "owner" && property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized to delete this property"
      });
    }
    await _Property.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Property deleted successfully"
    });
  } catch (err) {
    console.error("Delete Property Error:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

// 🟡 Approve Property (Admin Only)
router.patch("/:id/approve", _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)("admin"), async (req, res) => {
  try {
    const property = await _Property.default.findByIdAndUpdate(req.params.id, {
      isApproved: true
    }, {
      new: true
    });
    if (!property) return res.status(404).json({
      message: "Property not found"
    });
    res.status(200).json({
      message: "Property approved successfully",
      property
    });
  } catch (err) {
    console.error("Approve Property Error:", err);
    res.status(500).json({
      error: err.message
    });
  }
});
var _default = exports.default = router;