import { useEffect, useCallback, useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { FiX, FiVolume2, FiVolumeX, FiMaximize, FiPlus, FiThumbsUp, FiShare2 } from 'react-icons/fi';

const TrailerModal = ({ videoId, title, onClose, thumbnail }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoContainerRef = useRef(null);

  const handleVideoReady = () => {
    setIsReady(true);
  };

  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
  };

  // Handle ESC key to close modal or exit fullscreen
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (isFullscreen) {
        setIsFullscreen(false);
      } else {
        onClose();
      }
    }
  }, [onClose, isFullscreen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  // Close when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const cleanTitle = (title) => {
    if (!title) return '';
    return title
      .replace(/official\s*trailer/gi, '')
      .replace(/\|.*$/i, '')
      .replace(/HD|4K/gi, '')
      .trim();
  };

  // Fullscreen handlers - Custom overlay approach
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenExit = () => {
    setIsFullscreen(false);
  };

  // Random data for UI
  const matchPercentage = 85 + Math.floor(Math.random() * 14);
  const year = 2020 + Math.floor(Math.random() * 5);

  return (
    <>
      {/* Modal Backdrop - Hide when fullscreen */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto modal-backdrop"
          onClick={handleBackdropClick}
        >
          {/* Ambient Background Effect */}
          <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Layer 1: Main thumbnail color extraction */}
            <div 
              className="absolute inset-0 scale-150 opacity-70"
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(120px) brightness(1.2) saturate(4) contrast(1.5)'
              }}
            />
            
            {/* Layer 2: Shifted hue version */}
            <div 
              className="absolute inset-0 scale-[2] opacity-50"
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(180px) brightness(1) saturate(5) hue-rotate(60deg)'
              }}
            />
            
            {/* Layer 3: Another hue shift */}
            <div 
              className="absolute inset-0 scale-[2.5] opacity-35"
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(250px) brightness(0.8) saturate(6) hue-rotate(120deg)'
              }}
            />
            
            {/* Animated gradient overlays for color variety */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/15 to-blue-500/20 animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-tl from-cyan-500/15 via-pink-500/10 to-yellow-500/15 animate-pulse"
              style={{ animationDuration: '5s', animationDelay: '1s' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-orange-500/10 to-indigo-500/15 animate-pulse"
              style={{ animationDuration: '6s', animationDelay: '2s' }}
            />
            
            {/* Rotating gradient for shimmer effect */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(255,0,0,0.3), rgba(255,127,0,0.2), rgba(255,255,0,0.2), rgba(0,255,0,0.2), rgba(0,255,255,0.2), rgba(0,0,255,0.3), rgba(255,0,255,0.2), rgba(255,0,0,0.3))',
                animation: 'spin 20s linear infinite',
                filter: 'blur(150px)'
              }}
            />
            
            {/* Subtle center highlight */}
            <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
            
            {/* Vignette - keeps focus on center but allows colors to show */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl mx-4 my-8 md:my-12 trailer-modal">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 md:top-2 md:right-2 z-[210] w-10 h-10 rounded-full bg-[#181818] hover:bg-[#282828] text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-white/10"
              aria-label="Close trailer"
            >
              <FiX className="text-xl" />
            </button>

            {/* Video Section */}
            <div 
              ref={videoContainerRef}
              className="relative w-full aspect-video rounded-t-lg overflow-hidden bg-black"
              style={{
                boxShadow: `
                  0 30px 70px -15px rgba(0, 0, 0, 1),
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `
              }}
            >
            {videoId && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                width="100%"
                height="100%"
                playing={isPlaying}
                muted={isMuted}
                controls={false}
                onReady={handleVideoReady}
                onError={handleVideoError}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      fs: 0,
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      playsinline: 1
                    },
                    embedOptions: {
                      host: 'https://www.youtube-nocookie.com'
                    }
                  }
                }}
              />
            )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none" />
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="flex items-end justify-between">
              {/* Left Side - Title & Buttons */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  {cleanTitle(title)}
                </h1>
                <div className="flex items-center space-x-3">
                  {/* Play/Pause Button */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center px-5 md:px-8 py-2 md:py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                  >
                    <span className="mr-2">▶</span>
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  
                  {/* Add to List */}
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors group">
                    <FiPlus className="text-white text-lg md:text-xl" />
                  </button>
                  
                  {/* Like */}
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors group">
                    <FiThumbsUp className="text-white text-lg md:text-xl" />
                  </button>
                </div>
              </div>
              
              {/* Right Side - Volume & Fullscreen */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-colors"
                >
                  {isMuted ? (
                    <FiVolumeX className="text-white text-lg md:text-xl" />
                  ) : (
                    <FiVolume2 className="text-white text-lg md:text-xl" />
                  )}
                </button>

                {/* Fullscreen Button */}
                <button 
                  onClick={handleFullscreenToggle}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:bg-gray-400/20 transition-colors"
                  title="Toggle fullscreen"
                >
                  <FiMaximize className="text-white text-lg md:text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#181818]/90 backdrop-blur-md rounded-b-lg p-4 md:p-8 relative overflow-hidden border-t border-white/5">
          {/* Color bleed from video */}
          <div 
            className="absolute -top-40 left-0 right-0 h-56 opacity-50"
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'blur(100px) brightness(1) saturate(4)',
              maskImage: 'linear-gradient(to bottom, white, transparent)'
            }}
          />
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
            {/* Left Column - Details */}
            <div className="flex-1">
              {/* Meta Info */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="text-green-500 font-bold">{matchPercentage}% Match</span>
                <span className="text-gray-400">{year}</span>
                <span className="border border-gray-500 px-1.5 py-0.5 text-gray-400 text-xs">HD</span>
                <span className="border border-gray-500 px-1.5 py-0.5 text-gray-400 text-xs">16+</span>
              </div>
              
              {/* Description */}
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
                Watch the official trailer for this exciting movie. Experience the action, drama, and thrilling moments that await you. Don't miss out on this cinematic masterpiece.
              </p>
            </div>

            {/* Right Column - Additional Info */}
            <div className="w-full md:w-64 space-y-3 text-sm">
              <p className="text-gray-400">
                <span className="text-gray-500">Cast: </span>
                <span className="text-white hover:underline cursor-pointer">Various Artists</span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">Genres: </span>
                <span className="text-white">Action, Drama, Thriller</span>
              </p>
              <p className="text-gray-400">
                <span className="text-gray-500">This movie is: </span>
                <span className="text-white">Exciting, Suspenseful</span>
              </p>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FiShare2 className="mr-2" />
                <span className="text-sm">Share</span>
              </button>
            </div>
            <p className="text-gray-500 text-xs">
              Press <span className="text-white font-medium">ESC</span> to close
            </p>
          </div>
        </div>
        </div>
      </div>
      )}
      
      {/* Fullscreen Video Container - Single Video Instance */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[300] bg-black">
          <div className="absolute inset-0">
            {videoId && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                width="100vw"
                height="100vh"
                playing={isPlaying}
                muted={isMuted}
                controls={true}
                onReady={handleVideoReady}
                onError={handleVideoError}
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      fs: 1,
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      playsinline: 1
                    },
                    embedOptions: {
                      host: 'https://www.youtube-nocookie.com'
                    }
                  }
                }}
              />
            )}
            
            {/* Fullscreen Controls Overlay */}
            <div className="absolute bottom-8 right-8 flex items-center space-x-3 z-10">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="w-14 h-14 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <FiVolumeX className="text-white text-2xl" />
                ) : (
                  <FiVolume2 className="text-white text-2xl" />
                )}
              </button>
              
              <button 
                onClick={handleFullscreenExit}
                className="w-14 h-14 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
                title="Exit fullscreen"
              >
                <FiX className="text-white text-2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerModal;
