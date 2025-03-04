import express from "express";
import Property from "../models/Property.js";
import multer from "multer";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// Multer configuration (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ----- Optional Admin Route -----
// If needed, this route returns all properties for admin users.
// You can keep or remove this route based on your needs.
router.get("/admin", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "username");
    res.status(200).json(properties);
  } catch (err) {
    console.error("Admin GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----- Owner & Public Routes -----

// Create Property (only for 'owner')
// Note: Admin approval is removed; properties are marked as approved immediately.
router.post("/", verifyToken, verifyRole("owner"), upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "properties" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = result.secure_url;
    }

    const newProperty = new Property({
      ...req.body,
      owner: req.user.id,
      image: imageUrl,
      isApproved: true, // Immediately approved
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (err) {
    console.error("Create Property error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Remove the approve route since approval is no longer needed
// router.put("/:id/approve", verifyToken, verifyRole("admin"), async (req, res) => {
//   // This route is now redundant.
// });

// Get All Properties (public)
router.get("/", async (req, res) => {
  try {
    // Return all properties since they are all approved
    const properties = await Property.find().populate("owner", "username");
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "username");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Property (only for 'owner')
router.put("/:id", verifyToken, verifyRole("owner"), async (req, res) => {
  try {
    // Simply update the property without forcing re-approval
    const updatedProperty = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { ...req.body },
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }
    res.status(200).json({ message: "Property updated successfully", updatedProperty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Property (for 'owner' or 'admin')
router.delete("/:id", verifyToken, verifyRole("owner", "admin"), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    if (req.user.role === "owner" && property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this property" });
    }
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
