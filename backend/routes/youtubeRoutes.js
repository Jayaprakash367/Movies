const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get trailer by movie name
router.get('/trailer', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const searchQuery = `${q} official trailer`;
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: 1,
        key: apiKey,
        videoEmbeddable: true
      }
    });

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      res.json({
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle
      });
    } else {
      res.status(404).json({ error: 'No trailer found' });
    }
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch trailer' });
  }
});

// Search trailers
router.get('/search', async (req, res) => {
  try {
    const { q, maxResults = 12 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const searchQuery = `${q} movie trailer`;
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: parseInt(maxResults),
        key: apiKey,
        videoEmbeddable: true
      }
    });

    const trailers = response.data.items.map(video => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt
    }));

    res.json(trailers);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search trailers' });
  }
});

// Get trending trailers
router.get('/trending', async (req, res) => {
  try {
    const { maxResults = 12 } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'official movie trailer 2024',
        type: 'video',
        maxResults: parseInt(maxResults),
        key: apiKey,
        videoEmbeddable: true,
        order: 'viewCount'
      }
    });

    const trailers = response.data.items.map(video => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt
    }));

    res.json(trailers);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch trending trailers' });
  }
});

// Get new releases
router.get('/new-releases', async (req, res) => {
  try {
    const { maxResults = 12 } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'new movie trailer 2024 official',
        type: 'video',
        maxResults: parseInt(maxResults),
        key: apiKey,
        videoEmbeddable: true,
        order: 'date'
      }
    });

    const trailers = response.data.items.map(video => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt
    }));

    res.json(trailers);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch new releases' });
  }
});

// Get popular trailers
router.get('/popular', async (req, res) => {
  try {
    const { maxResults = 12 } = req.query;
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: 'blockbuster movie trailer official',
        type: 'video',
        maxResults: parseInt(maxResults),
        key: apiKey,
        videoEmbeddable: true,
        order: 'relevance'
      }
    });

    const trailers = response.data.items.map(video => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt
    }));

    res.json(trailers);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch popular trailers' });
  }
});

module.exports = router;
