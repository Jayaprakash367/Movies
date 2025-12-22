import { fetchTrailers } from "../services/youtube.service.js";

// Mock data for fallback
const MOCK_TRAILERS = [
  {
    videoId: "n9xhJsAgX1s",
    title: "PrimeCut Studio Official Trailer",
    thumbnail: "https://img.youtube.com/vi/n9xhJsAgX1s/maxresdefault.jpg",
    channel: "PrimeCut Studio",
    publishedAt: "2024-01-15T10:30:00Z",
    channelId: "UCmovietrailers"
  },
  {
    videoId: "11dKzqnMg5I",
    title: "Border 2 - Sequel Action Trailer",
    thumbnail: "https://img.youtube.com/vi/11dKzqnMg5I/maxresdefault.jpg",
    channel: "Action Movies Channel",
    publishedAt: "2024-02-10T08:00:00Z",
    channelId: "UCactionmovies"
  },
  {
    videoId: "1ZdY0-iHIAY",
    title: "Epic Adventure - Full HD Trailer",
    thumbnail: "https://img.youtube.com/vi/1ZdY0-iHIAY/maxresdefault.jpg",
    channel: "Epic Films",
    publishedAt: "2024-03-05T14:20:00Z",
    channelId: "UCepicfilms"
  },
  {
    videoId: "gCYwaj8H1fQ",
    title: "Drama Masterpiece Official Trailer",
    thumbnail: "https://img.youtube.com/vi/gCYwaj8H1fQ/maxresdefault.jpg",
    channel: "Drama Entertainment",
    publishedAt: "2024-02-20T11:45:00Z",
    channelId: "UCdramaent"
  },
  {
    videoId: "Uo8IKvXmFXM",
    title: "Comedy Gold - Hilarious Movie Trailer",
    thumbnail: "https://img.youtube.com/vi/Uo8IKvXmFXM/maxresdefault.jpg",
    channel: "Comedy Central",
    publishedAt: "2024-03-12T09:30:00Z",
    channelId: "UCcomedycentral"
  },
  {
    videoId: "4q2SaoKagAE",
    title: "Sci-Fi Thriller Official Trailer",
    thumbnail: "https://img.youtube.com/vi/4q2SaoKagAE/maxresdefault.jpg",
    channel: "SciFi Studios",
    publishedAt: "2024-01-25T16:00:00Z",
    channelId: "UCscifistudios"
  },
  {
    videoId: "0xvsmKwzSvU",
    title: "Horror Movie - Official Trailer 2024",
    thumbnail: "https://img.youtube.com/vi/0xvsmKwzSvU/maxresdefault.jpg",
    channel: "Horror Nights",
    publishedAt: "2024-02-14T19:20:00Z",
    channelId: "UChorrornights"
  },
  {
    videoId: "aqz-KE-bpKQ",
    title: "Thriller - Edge of Your Seat Trailer",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    channel: "Thriller Films",
    publishedAt: "2024-03-01T12:15:00Z",
    channelId: "UCthrillerfirms"
  },
  {
    videoId: "RfiQYRn7fBg",
    title: "Romantic Drama - New Release Trailer",
    thumbnail: "https://img.youtube.com/vi/RfiQYRn7fBg/maxresdefault.jpg",
    channel: "Romance Pictures",
    publishedAt: "2024-03-10T10:45:00Z",
    channelId: "UCromancepics"
  },
  {
    videoId: "rXFLMJPLCHQ",
    title: "Action Packed - Ultimate Trailer",
    thumbnail: "https://img.youtube.com/vi/rXFLMJPLCHQ/maxresdefault.jpg",
    channel: "Action Packed Films",
    publishedAt: "2024-02-28T15:30:00Z",
    channelId: "UCactionpacked"
  }
];

export const getTrailers = async (req, res) => {
  try {
    const { maxResults = 20 } = req.query;
    const data = await fetchTrailers("", "", parseInt(maxResults));
    res.json(data);
  } catch (error) {
    console.error("Error in getTrailers:", error);
    res.json(MOCK_TRAILERS.slice(0, parseInt(req.query.maxResults) || 20));
  }
};

export const searchTrailers = async (req, res) => {
  try {
    const { q = "movie trailer", pageToken = "", maxResults = 20 } = req.query;
    const data = await fetchTrailers(q, pageToken, maxResults);
    res.json(data);
  } catch (error) {
    console.error("Error in searchTrailers:", error);
    res.json(MOCK_TRAILERS.slice(0, parseInt(req.query.maxResults) || 20));
  }
};

export const getTrending = async (req, res) => {
  try {
    const { pageToken = "", maxResults = 20 } = req.query;
    const data = await fetchTrailers("trending movie trailer 2024", pageToken, maxResults);
    res.json(data);
  } catch (error) {
    console.error("Error in getTrending:", error);
    res.json(MOCK_TRAILERS.slice(0, parseInt(req.query.maxResults) || 20));
  }
};

export const getPopular = async (req, res) => {
  try {
    const { pageToken = "", maxResults = 20 } = req.query;
    const data = await fetchTrailers("popular movie trailer 2024", pageToken, maxResults);
    res.json(data);
  } catch (error) {
    console.error("Error in getPopular:", error);
    res.json(MOCK_TRAILERS.slice(0, parseInt(req.query.maxResults) || 20));
  }
};

export const getNewReleases = async (req, res) => {
  try {
    const { pageToken = "", maxResults = 20 } = req.query;
    const data = await fetchTrailers("new movie trailer 2024", pageToken, maxResults);
    res.json(data);
  } catch (error) {
    console.error("Error in getNewReleases:", error);
    res.json(MOCK_TRAILERS.slice(0, parseInt(req.query.maxResults) || 20));
  }
};
