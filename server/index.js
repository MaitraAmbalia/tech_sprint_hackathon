const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Connect to Database
const connectDB = require('./config/db');
connectDB();

// Import Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/youtube', require('./routes/youtube'));
app.use('/api/ai', require('./routes/ai'));

// Base Route
app.get('/', (req, res) => {
  res.send('YT Focus API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});