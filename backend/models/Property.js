import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    images: [{ type: String }], // Multiple image URLs
    size: { type: Number, required: true },
    location: { type: String, required: true, index: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    isApproved: { type: Boolean, default: false }, // Admin approval status
  },
  { timestamps: true }
);

// Adding indexes for optimized queries
propertySchema.index({ location: 1, price: -1 });

const Property = mongoose.model("Property", propertySchema);
export default Property;
