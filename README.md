# TrailerFlix - Movie Trailer OTT Platform

A Netflix-style web platform for watching movie trailers.

## Features

- 🎬 Netflix-like UI with dark cinematic theme
- 🔍 Search for movie trailers
- ▶️ Full-screen trailer playback
- 📱 Responsive design (mobile + desktop)
- 🎨 Smooth animations and hover effects
- 🌐 100% legal - uses only YouTube trailers

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router
- React Player
- React Icons

**Backend:**
- Node.js
- Express
- Axios
- YouTube Data API v3

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` file and add your YouTube API key:
```
PORT=5000
YOUTUBE_API_KEY=your_actual_api_key_here
FRONTEND_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the App

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
movie/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── youtubeRoutes.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── MovieCard.jsx
    │   │   └── TrailerModal.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── Search.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/youtube/trailer?q=movie_name` | Get trailer for a specific movie |
| `GET /api/youtube/search?q=query` | Search for trailers |
| `GET /api/youtube/trending` | Get trending trailers |
| `GET /api/youtube/popular` | Get popular trailers |
| `GET /api/youtube/new-releases` | Get new release trailers |

## Legal Notice

This application displays only official movie trailers from YouTube. No full movies are hosted or streamed. All content is legally sourced through the YouTube Data API v3.

## License

MIT License - For educational purposes only.

Run frontend
cd "c:\Users\jayaprakash.k\OneDrive\Documents\movie\backend" && npm start
Run backend
cd "c:\Users\jayaprakash.k\OneDrive\Documents\movie\frontend" && npm run dev