import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import HeroCard from '../components/HeroCard';
import LanguageSelector, { LANGUAGES } from '../components/LanguageSelector';
import { FiChevronLeft, FiChevronRight, FiPlay, FiInfo, FiVolume2, FiVolumeX } from 'react-icons/fi';

const API_BASE = '/api/youtube';

const Home = ({ selectedLanguage }) => {
  const [trendingTrailers, setTrendingTrailers] = useState([]);
  const [popularTrailers, setPopularTrailers] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [actionTrailers, setActionTrailers] = useState([]);
  const [comedyTrailers, setComedyTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heroTrailer, setHeroTrailer] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Refs for scroll containers
  const trendingRef = useRef(null);
  const popularRef = useRef(null);
  const newReleasesRef = useRef(null);
  const actionRef = useRef(null);
  const comedyRef = useRef(null);

  useEffect(() => {
    fetchAllTrailers();
  }, []);

  // Rotate hero banner every 8 seconds
  useEffect(() => {
    if (trendingTrailers.length > 0) {
      const interval = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % Math.min(trendingTrailers.length, 5));
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [trendingTrailers]);

  useEffect(() => {
    if (trendingTrailers.length > 0) {
      setHeroTrailer(trendingTrailers[heroIndex]);
    }
  }, [heroIndex, trendingTrailers]);

  const fetchAllTrailers = async () => {
    setLoading(true);
    
    try {
      const [trending, popular, newRel, action, comedy] = await Promise.all([
        axios.get(`${API_BASE}/trending?maxResults=20`),
        axios.get(`${API_BASE}/popular?maxResults=20`),
        axios.get(`${API_BASE}/new-releases?maxResults=20`),
        axios.get(`${API_BASE}/search?q=action movie trailer&maxResults=15`),
        axios.get(`${API_BASE}/search?q=comedy movie trailer&maxResults=15`)
      ]);

      // All requests should return data from backend
      setTrendingTrailers(Array.isArray(trending.data) ? trending.data : []);
      setPopularTrailers(Array.isArray(popular.data) ? popular.data : []);
      setNewReleases(Array.isArray(newRel.data) ? newRel.data : []);
      setActionTrailers(Array.isArray(action.data) ? action.data : []);
      setComedyTrailers(Array.isArray(comedy.data) ? comedy.data : []);

      if (Array.isArray(trending.data) && trending.data.length > 0) {
        setHeroTrailer(trending.data[0]);
      }
    } catch (error) {
      console.error('Error fetching trailers:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openTrailer = (trailer) => {
    setSelectedTrailer(trailer);
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  // Filter trailers by language
  const filterByLanguage = (trailers) => {
    if (selectedLanguage === 'All Languages') return trailers;
    return trailers.filter(trailer => trailer.language === selectedLanguage);
  };

  const cleanTitle = (title) => {
    if (!title) return '';
    return title
      .replace(/official\s*trailer/gi, '')
      .replace(/\|.*$/i, '')
      .replace(/HD|4K/gi, '')
      .replace(/\s*-\s*$/, '')
      .trim()
      .substring(0, 50);
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="flex space-x-3 overflow-hidden px-4 md:px-12">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] aspect-video bg-gray-800 rounded skeleton"
        />
      ))}
    </div>
  );

  // Trailer Row Component - Netflix Style
  const TrailerRow = ({ title, trailers, scrollRef, showRank = false }) => {
    const filteredTrailers = filterByLanguage(trailers);
    
    return (
    <section className="mb-8 md:mb-12 relative group/row">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 md:mb-4 px-4 md:px-12">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white flex items-center group cursor-pointer">
          {title}
          <span className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
            Explore All →
          </span>
        </h2>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(scrollRef, 'left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="slider-arrow w-10 h-10 rounded-full flex items-center justify-center">
            <FiChevronLeft className="text-white text-xl" />
          </div>
        </button>

        {/* Movies Container */}
        <div 
          ref={scrollRef}
          className="scroll-container flex space-x-2 md:space-x-3 px-4 md:px-12 movie-row"
        >
          {filteredTrailers && filteredTrailers.length > 0 ? (
            filteredTrailers.map((trailer, index) => (
              <MovieCard
                key={trailer.videoId}
                trailer={trailer}
                index={index}
                showRank={showRank}
                onClick={() => openTrailer(trailer)}
              />
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-500">No trailers available for {selectedLanguage}</div>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(scrollRef, 'right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="slider-arrow w-10 h-10 rounded-full flex items-center justify-center">
            <FiChevronRight className="text-white text-xl" />
          </div>
        </button>
      </div>
    </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - With Video Playback */}
      {heroTrailer && !loading && (
        <HeroCard trailer={heroTrailer} onPlay={openTrailer} />
      )}

      {/* Main Content - Trailer Rows */}
      <div className="relative -mt-32 z-10 pb-20">
        {loading ? (
          <div className="space-y-12 pt-32">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 w-40 bg-gray-800 rounded mb-4 mx-4 md:mx-12 skeleton" />
                <LoadingSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            <TrailerRow 
              title="Trending Now" 
              trailers={trendingTrailers} 
              scrollRef={trendingRef}
            />
            <TrailerRow 
              title="Top 10 Trailers This Week" 
              trailers={popularTrailers.slice(0, 10)} 
              scrollRef={popularRef}
              showRank={true}
            />
            <TrailerRow 
              title="New Releases" 
              trailers={newReleases} 
              scrollRef={newReleasesRef}
            />
            <TrailerRow 
              title="Action & Adventure" 
              trailers={actionTrailers} 
              scrollRef={actionRef}
            />
            <TrailerRow 
              title="Comedy" 
              trailers={comedyTrailers} 
              scrollRef={comedyRef}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-12 border-t border-gray-800">
        <div className="max-w-[1800px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-gray-400 text-sm mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                <li className="hover:text-white cursor-pointer transition-colors">Trending</li>
                <li className="hover:text-white cursor-pointer transition-colors">New Releases</li>
                <li className="hover:text-white cursor-pointer transition-colors">My List</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-4">Genres</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Action</li>
                <li className="hover:text-white cursor-pointer transition-colors">Comedy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Drama</li>
                <li className="hover:text-white cursor-pointer transition-colors">Horror</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 text-sm mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl md:text-3xl font-black">
                <span className="text-red-600">JP</span>
                <span className="text-white">MOVIES</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs text-center md:text-right">
              © {new Date().getFullYear()} JP Movies. All trailers sourced from YouTube.
              <br className="md:hidden" />
              <span className="md:ml-2">For educational purposes only.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <TrailerModal
          videoId={selectedTrailer.videoId}
          title={selectedTrailer.title}
          thumbnail={selectedTrailer.thumbnail}
          onClose={closeTrailer}
        />
      )}
    </div>
  );
};

export default Home;
