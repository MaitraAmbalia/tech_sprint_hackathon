const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/users/leaderboard
// @desc    Get top 10 users by XP
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({}).sort({ xp: -1 }).limit(10).select('name xp avatar level');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/users/add-xp
// @desc    Add XP and check for level up
router.patch('/add-xp', protect, async (req, res) => {
  const { amount } = req.body; // e.g., { amount: 50 }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.xp += amount;
    
    // Simple Level Up Logic (Level = XP / 100)
    const newLevel = Math.floor(user.xp / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
      // You could return { levelUp: true } here to trigger confetti on frontend
    }

    await user.save();
    res.json({ xp: user.xp, level: user.level });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;