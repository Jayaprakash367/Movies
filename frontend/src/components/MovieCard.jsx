import { FiPlay, FiPlus, FiThumbsUp } from 'react-icons/fi';
import { useState } from 'react';

const MovieCard = ({ trailer, onClick, index, showRank }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!trailer) return null;

  // Clean up the title for display
  const cleanTitle = (title) => {
    if (!title) return 'Untitled';
    return title
      .replace(/official\s*trailer/gi, '')
      .replace(/\|.*$/i, '')
      .replace(/\s*-\s*$/, '')
      .replace(/\s*:\s*$/, '')
      .replace(/\(\d{4}\)/, '')
      .replace(/HD|4K|Official|Trailer/gi, '')
      .trim()
      .substring(0, 40);
  };

  // Get random match percentage for UI
  const matchPercentage = 85 + Math.floor(Math.random() * 14);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] transition-all"
    >
      {/* Rank Number for Top 10 */}
      {showRank && (
        <div className="absolute -left-8 md:-left-12 bottom-0 z-10 pointer-events-none">
          <span className="text-6xl md:text-8xl font-black text-transparent" style={{
            WebkitTextStroke: '2px rgba(255,255,255,0.3)',
            fontFamily: "'Bebas Neue', cursive"
          }}>
            {index + 1}
          </span>
        </div>
      )}

      {/* Main Card */}
      <div
        onClick={onClick}
        className={`relative cursor-pointer rounded-md overflow-hidden transition-all duration-300 ease-out ${
          isHovered ? 'scale-[1.15] z-50 shadow-2xl shadow-red-900/60' : 'scale-100 z-10'
        }`}
        style={{
          transformOrigin: index === 0 ? 'left center' : 'center center'
        }}
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-900 border border-gray-700 rounded-md">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-md" />
          )}
          
          {/* Thumbnail Image */}
          <img
            src={trailer.thumbnail}
            alt={cleanTitle(trailer.title)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              // Robust fallback chain for YouTube thumbnails
              const currentSrc = e.target.src;
              
              if (currentSrc.includes('sddefault')) {
                // Try mqdefault (320x180) - very reliable
                e.target.src = currentSrc.replace('sddefault', 'mqdefault');
              } else if (currentSrc.includes('mqdefault')) {
                // Try hqdefault (480x360)
                e.target.src = currentSrc.replace('mqdefault', 'hqdefault');
              } else if (currentSrc.includes('hqdefault')) {
                // Try default (120x90) - guaranteed to exist
                e.target.src = currentSrc.replace('hqdefault', 'default');
              } else if (currentSrc.includes('maxresdefault')) {
                // Fallback from max to sd
                e.target.src = currentSrc.replace('maxresdefault', 'sddefault');
              } else if (trailer.videoId && !currentSrc.includes('default.jpg')) {
                // Final guaranteed fallback
                e.target.src = `https://img.youtube.com/vi/${trailer.videoId}/default.jpg`;
              }
              setImageLoaded(true);
            }}
          />
          
          {/* Dark Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`} />

          {/* Play Icon Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transform hover:scale-110 transition-all shadow-lg hover:shadow-2xl">
              <FiPlay className="text-black text-xl md:text-2xl ml-1" fill="black" />
            </div>
          </div>

          {/* HD Badge */}
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-red-600/90 rounded text-[10px] text-white font-semibold">
            HD
          </div>

          {/* Match Percentage - Netflix Style */}
          {isHovered && (
            <div className="absolute top-2 left-2 flex items-center space-x-1">
              <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-xs font-bold text-green-500">
                {matchPercentage}%
              </div>
            </div>
          )}
        </div>

        {/* Hover Info Panel */}
        <div className={`absolute left-0 right-0 bg-[#181818] border-l border-r border-b border-gray-700 transition-all duration-300 overflow-hidden ${
          isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4">
            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-3 gap-2">
              {/* Play Button */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onClick(); 
                }}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors"
              >
                <FiPlay className="mr-1" size={16} fill="black" />
                Play
              </button>
              
              {/* Add to List Button */}
              <button className="p-2 border border-gray-500 rounded-full hover:border-white hover:bg-gray-700/50 transition-colors">
                <FiPlus size={18} className="text-gray-300 hover:text-white" />
              </button>
              
              {/* Like Button */}
              <button className="p-2 border border-gray-500 rounded-full hover:border-white hover:bg-gray-700/50 transition-colors">
                <FiThumbsUp size={18} className="text-gray-300 hover:text-white" />
              </button>
            </div>

            {/* Title and Info */}
            <h3 className="text-white font-semibold text-sm truncate mb-2">
              {cleanTitle(trailer.title)}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>2024</span>
              <span>13+</span>
            </div>

            {/* Genre Tags */}
            <div className="flex gap-1 flex-wrap">
              <span className="text-[10px] bg-gray-700/50 text-gray-300 px-2 py-1 rounded">Action</span>
              <span className="text-[10px] bg-gray-700/50 text-gray-300 px-2 py-1 rounded">Thriller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
