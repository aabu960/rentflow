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
import rateLimit from 'express-rate-limit';
import redis from 'redis';
// import { createAdapter } from 'socket.io-redis';
import { Queue } from 'bullmq';

dotenv.config();

const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(compression()); // GZIP Compression

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Redis Caching
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// Background Jobs (BullMQ)
const propertyQueue = new Queue('property-processing');

// Connect to MongoDB with Connection Pooling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Connection Pooling
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
app.use('/', paymentRoutes);
app.use('/properties', propertyRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
