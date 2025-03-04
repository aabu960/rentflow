import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Cloudinary Image URL
  isApproved: { type: Boolean, default: false }, // Admin approval status
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property;