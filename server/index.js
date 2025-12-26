const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const authRoutes = require('../routes/auth');
const goalRoutes = require('../routes/goals');
const userRoutes = require('../routes/userRoutes');
const aiRoutes = require('../routes/ai');
const youtubeRoutes = require('../routes/youtube');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins (or set to your frontend URL in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());

// Database Connection (Optimized for Serverless)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Ensure DB is connected for every request
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/youtube', youtubeRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('YT Focus API is Running');
});

// Export for Vercel
module.exports = app;