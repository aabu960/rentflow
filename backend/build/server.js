"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _authRoutes = _interopRequireDefault(require("./routers/authRoutes.js"));
var _protectedRoutes = _interopRequireDefault(require("./routers/protectedRoutes.js"));
var _propertyRoutes = _interopRequireDefault(require("./routers/propertyRoutes.js"));
var _paymentRoutes = _interopRequireDefault(require("./routers/paymentRoutes.js"));
var _cloudinary = require("cloudinary");
var _compression = _interopRequireDefault(require("compression"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const app = (0, _express.default)();

// Cloudinary Configuration
_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use((0, _cors.default)({
  origin: 'https://rentflow-l80j.onrender.com'
}));
app.use(_express.default.json());
app.use((0, _compression.default)()); // GZIP Compression

// Connect to MongoDB with Connection Pooling
_mongoose.default.connect(process.env.MONGO_URI, {}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// Routes
app.use('/', _paymentRoutes.default);
app.use('/properties', _propertyRoutes.default);
app.use('/auth', _authRoutes.default);
app.use('/protected', _protectedRoutes.default);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));