const express = require('express');
const router = express.Router();
const axios = require('axios');

// @route   GET /api/youtube/playlist?url=...
// @desc    Fetch playlist details and videos
router.get('/playlist', async (req, res) => {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ message: 'URL is required' });

  // Extract Playlist ID from URL
  const playlistId = url.split('list=')[1]?.split('&')[0];
  if (!playlistId) return res.status(400).json({ message: 'Invalid YouTube Playlist URL' });

  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    // 1. Get Playlist Details (Title, Channel)
    const listUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
    const listRes = await axios.get(listUrl);
    const playlistInfo = listRes.data.items[0]?.snippet;

    // 2. Get Videos in Playlist
    const videoUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
    const videoRes = await axios.get(videoUrl);

    // Format data for our frontend
    const videos = videoRes.data.items.map(item => ({
      youtubeId: item.contentDetails.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      description: item.snippet.description
    }));

    res.json({
      title: playlistInfo?.title,
      instructor: playlistInfo?.channelTitle,
      thumbnail: playlistInfo?.thumbnails?.medium?.url,
      videos: videos
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch from YouTube' });
  }
});

module.exports = router;