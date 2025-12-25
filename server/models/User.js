const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional if using Google Auth later
  avatar: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastStudyDate: { type: Date },
  stats: {
    totalMinutes: { type: Number, default: 0 },
    videosCompleted: { type: Number, default: 0 },
    quizzesPassed: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);