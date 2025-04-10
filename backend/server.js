import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routers/authRoutes.js';
import protectedRoutes from './routers/protectedRoutes.js';
import propertyRoutes from './routers/propertyRoutes.js';
import paymentRoutes from './routers/paymentRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
import compression from 'compression';

dotenv.config();

const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors({ origin: 'https://rentflow-l80j.onrender.com' }));
app.use(express.json());
app.use(compression()); // GZIP Compression

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/properties', propertyRoutes);
app.use('/payment', paymentRoutes);

// Root route to avoid 404 on /
app.get('/', (req, res) => {
  res.send('✅ RentFlow Backend is running!');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
