const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/goals
// @desc    Create a new learning goal (Roadmap)
router.post('/', protect, async (req, res) => {
  const { title, playlistUrl, videos, thumbnail, instructor } = req.body;

  try {
    // Check if user already has this goal
    const goalExists = await Goal.findOne({ user: req.user._id, playlistUrl });
    if (goalExists) {
        return res.status(400).json({ message: 'You are already learning this playlist!' });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      playlistUrl,
      thumbnail,
      instructor,
      totalVideos: videos.length,
      videos: videos.map(v => ({
        youtubeId: v.youtubeId,
        title: v.title,
        watched: false,
        isCurrent: false // We will set the first one to true below
      }))
    });

    // Set first video as current
    if (goal.videos.length > 0) {
      goal.videos[0].isCurrent = true;
      await goal.save();
    }

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/goals
// @desc    Get all user goals
router.get('/', protect, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/goals/:id
// @desc    Get single goal details
router.get('/:id', protect, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if(goal.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(goal);
  } catch (error) {
    res.status(404).json({ message: 'Goal not found' });
  }
});

// @route   PATCH /api/goals/:id/progress
// @desc    Mark video as watched & unlock next
router.patch('/:id/progress', protect, async (req, res) => {
    const { videoId } = req.body; // The MongoDB _id of the sub-document video
  
    try {
      const goal = await Goal.findById(req.params.id);
      
      // Find the video index
      const videoIndex = goal.videos.findIndex(v => v._id.toString() === videoId);
      
      if (videoIndex === -1) return res.status(404).json({ message: 'Video not found' });
  
      // Mark as watched
      goal.videos[videoIndex].watched = true;
      goal.videos[videoIndex].isCurrent = false;
      goal.completedVideos += 1;
      
      // Calculate progress
      goal.progress = Math.round((goal.completedVideos / goal.totalVideos) * 100);
  
      // Unlock next video
      if (videoIndex + 1 < goal.videos.length) {
        goal.videos[videoIndex + 1].isCurrent = true;
      }
  
      await goal.save();
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;