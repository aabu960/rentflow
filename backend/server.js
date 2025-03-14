import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routers/authRoutes.js';
import protectedRoutes from './routers/protectedRoutes.js';
// import uploadRoutes from "./routers/uploadRoutes.js";
import propertyRoutes from "./routers/propertyRoutes.js";
import { v2 as cloudinary } from 'cloudinary';
import paymentRoutes from './routers/paymentRoutes.js'
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Routes
app.use('/', paymentRoutes);
app.use('/properties', propertyRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
// app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
