"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const propertySchema = new _mongoose.default.Schema({
  owner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  images: [{
    type: String
  }],
  // Multiple image URLs
  size: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true,
    index: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  } // Admin approval status
}, {
  timestamps: true
});

// Adding indexes for optimized queries
propertySchema.index({
  location: 1,
  price: -1
});
const Property = _mongoose.default.model("Property", propertySchema);
var _default = exports.default = Property;