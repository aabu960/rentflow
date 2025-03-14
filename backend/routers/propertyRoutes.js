import express from "express";
import mongoose from "mongoose";
import Property from "../models/Property.js";
import multer from "multer";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();

// Multer memory storage (for Cloudinary uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images", 5);

// 🟢 Get All Properties (Public)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().populate("owner", "username");
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error Fetching Properties:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔵 Get Single Property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "username");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (err) {
    console.error("Error Fetching Property:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟣 Create Property (Owner Only)
router.post("/", verifyToken, verifyRole("owner"), upload, async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "properties" },
            (error, result) => (error ? reject(error) : resolve(result.secure_url))
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        })
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const newProperty = new Property({
      ...req.body,
      owner: req.user.id,
      images: imageUrls,
      isApproved: false,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (err) {
    console.error("Create Property Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔴 Update Property (Owner Only)
router.put("/:id", verifyToken, verifyRole("owner","admin"), upload, async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "properties" },
            (error, result) => (error ? reject(error) : resolve(result.secure_url))
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        })
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const updateData = { ...req.body };

    if (updateData.owner) {
      if (!mongoose.Types.ObjectId.isValid(updateData.owner)) {
        return res.status(400).json({ error: "Invalid owner ID format" });
      }
    }

    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) return res.status(404).json({ message: "Property not found or unauthorized" });
    res.status(200).json({ message: "Property updated successfully", updatedProperty });
  } catch (err) {
    console.error("Update Property Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟠 Delete Property (Owner or Admin)
router.delete("/:id", verifyToken, verifyRole("owner", "admin"), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (req.user.role === "owner" && property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this property" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error("Delete Property Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🟡 Approve Property (Admin Only)
router.patch("/:id/approve", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property approved successfully", property });
  } catch (err) {
    console.error("Approve Property Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
