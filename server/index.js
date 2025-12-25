const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db'); //
require('dotenv').config();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Define Routes (Make sure these paths match your actual files)
app.use('/api/auth', require('./routes/auth')); //
app.use('/api/goals', require('./routes/goals')); //
app.use('/api/users', require('./routes/userRoutes')); //
app.use('/api/ai', require('./routes/ai')); //
app.use('/api/youtube', require('./routes/youtube')); //

// 4. Test Route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ============================================================
// CRITICAL CHANGE FOR VERCEL: Export the App
// ============================================================
module.exports = app;

// Only listen on a port if we are NOT in production (Vercel handles the port automatically)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}