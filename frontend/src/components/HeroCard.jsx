import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPlus, FiInfo, FiVolume2, FiVolumeX } from 'react-icons/fi';
import ReactPlayer from 'react-player/youtube';

const HeroCard = ({ trailer, onPlay }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullTrailerMode, setIsFullTrailerMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Reset full trailer mode when trailer changes
    setIsFullTrailerMode(false);
    setShowVideo(false);
    setIsVideoPlaying(false);
    setIsReady(false);
    
    // Start video preview after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowVideo(true);
      setIsVideoPlaying(true);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trailer]);

  const handlePlayFullTrailer = () => {
    setIsFullTrailerMode(true);
    setShowVideo(true);
    setIsVideoPlaying(true);
    setIsMuted(false); // Unmute for full trailer
  };

  const handleVideoReady = () => {
    setIsReady(true);
  };

  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
    // Fallback to image if video fails
    setShowVideo(false);
  };

  const cleanTitle = (title) => {
    if (!title) return '';
    return title
      .replace(/official\s*trailer/gi, '')
      .replace(/\|.*$/i, '')
      .replace(/HD|4K/gi, '')
      .replace(/\s*-\s*$/, '')
      .trim()
      .substring(0, 60);
  };

  // Random data for UI
  const matchPercentage = 85 + Math.floor(Math.random() * 14);

  if (!trailer) return null;

  return (
    <div className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Background - Image or Video */}
      <div className="absolute inset-0">
        {showVideo && isVideoPlaying ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer.videoId}`}
              width="100%"
              height="100%"
              playing={isVideoPlaying}
              muted={isMuted}
              loop={!isFullTrailerMode}
              controls={isFullTrailerMode}
              onReady={handleVideoReady}
              onError={handleVideoError}
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover'
              }}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                    controls: isFullTrailerMode ? 1 : 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    fs: 1,
                    iv_load_policy: 3,
                    playsinline: 1
                  },
                  embedOptions: {
                    host: 'https://www.youtube-nocookie.com'
                  }
                }
              }}
            />
          </div>
        ) : (
          <img
            src={trailer.thumbnail}
            alt={trailer.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Multiple Gradient Overlays - Hide when playing full trailer */}
        {!isFullTrailerMode && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </>
        )}
      </div>

      {/* Hero Content - Hide when playing full trailer */}
      {!isFullTrailerMode && (
        <div className="relative h-full flex items-center">
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 w-full">
          <div className="max-w-2xl">
            {/* Netflix Series Badge */}
            <div className="flex items-center mb-4 animate-fade-in">
              <span className="text-red-600 font-bold text-xl mr-2">JP</span>
              <span className="text-gray-300 text-sm tracking-[0.3em] uppercase font-light">FILM</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl animate-slide-up">
              {cleanTitle(trailer.title)}
            </h1>

            {/* Match & Info */}
            <div className="flex items-center space-x-4 mb-4 animate-fade-in">
              <span className="text-green-500 font-bold">{matchPercentage}% Match</span>
              <span className="border border-gray-500 px-2 py-0.5 text-gray-300 text-sm">HD</span>
              <span className="text-gray-400">2024</span>
              <span className="border border-gray-500 px-2 py-0.5 text-gray-300 text-sm">16+</span>
            </div>

            {/* Top 10 Badge */}
            <div className="flex items-center mb-4">
              <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold">
                TOP 10
              </div>
              <span className="text-white text-lg ml-3">#1 in Trailers Today</span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 max-w-xl animate-fade-in">
              Experience the thrill with this official movie trailer. Get ready for an action-packed adventure 
              that will keep you on the edge of your seat. Watch now and discover what awaits.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3 md:space-x-4 animate-slide-up">
              <button
                onClick={handlePlayFullTrailer}
                className="flex items-center px-6 md:px-10 py-3 md:py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all transform hover:scale-105 ripple"
              >
                <FiPlay className="mr-2 text-xl md:text-2xl" fill="black" />
                <span className="text-base md:text-lg">Play</span>
              </button>
              <button 
                onClick={() => onPlay(trailer)}
                className="flex items-center px-5 md:px-8 py-3 md:py-4 bg-gray-500/60 text-white font-semibold rounded hover:bg-gray-500/80 transition-all ripple"
              >
                <FiInfo className="mr-2 text-xl md:text-2xl" />
                <span className="text-base md:text-lg">More Info</span>
              </button>
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors ml-2">
                <FiPlus className="text-white text-lg md:text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute right-4 md:right-12 bottom-32 md:bottom-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors bg-black/30"
        >
          {isMuted ? (
            <FiVolumeX className="text-white text-lg md:text-xl" />
          ) : (
            <FiVolume2 className="text-white text-lg md:text-xl" />
          )}
        </button>

        {/* Age Rating Badge */}
        <div className="absolute right-4 md:right-12 bottom-20 md:bottom-28 flex items-center">
          <div className="bg-black/60 border-l-4 border-red-600 px-4 py-1">
            <span className="text-white text-sm font-medium">16+</span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default HeroCard;
