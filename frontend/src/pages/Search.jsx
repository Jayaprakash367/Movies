import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { FiSearch, FiFilm, FiX } from 'react-icons/fi';

const API_BASE = '/api/youtube';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
      searchTrailers(q);
    }
  }, [searchParams]);

  const searchTrailers = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(`${API_BASE}/search`, {
        params: { q: searchQuery, maxResults: 20 }
      });
      setResults(response.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const openTrailer = (trailer) => {
    setSelectedTrailer(trailer);
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  // Popular searches suggestions
  const popularSearches = [
    { name: 'Avengers', icon: '🦸' },
    { name: 'Batman', icon: '🦇' },
    { name: 'Spider-Man', icon: '🕷️' },
    { name: 'Avatar', icon: '🌍' },
    { name: 'Inception', icon: '🎭' },
    { name: 'Interstellar', icon: '🚀' },
    { name: 'Dune', icon: '🏜️' },
    { name: 'Oppenheimer', icon: '💣' },
    { name: 'Mission Impossible', icon: '🎬' },
    { name: 'Fast Furious', icon: '🏎️' },
    { name: 'John Wick', icon: '🔫' },
    { name: 'Transformers', icon: '🤖' }
  ];

  // Genre filters
  const genres = [
    'Action', 'Comedy', 'Horror', 'Sci-Fi', 'Drama', 'Thriller', 'Romance', 'Animation'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 md:pt-24 pb-12">
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        {/* Search Header */}
        <div className="mb-8 md:mb-12">
          {/* Search Form - Netflix Style */}
          <form onSubmit={handleSearch} className="max-w-3xl">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, trailers..."
                className="w-full pl-12 pr-12 py-4 bg-[#1a1a1a] text-white rounded border border-gray-700 focus:border-white focus:outline-none text-lg transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                    setHasSearched(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              )}
            </div>
          </form>

          {/* Genre Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setQuery(genre + ' movie trailer');
                  setSearchParams({ q: genre + ' movie trailer' });
                }}
                className="category-pill px-4 py-2 rounded-full text-sm text-gray-300"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches - When no search */}
        {!hasSearched && (
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
              Popular Searches
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {popularSearches.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setQuery(item.name + ' movie trailer');
                    setSearchParams({ q: item.name + ' movie trailer' });
                  }}
                  className="group relative p-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg text-left transition-all hover:scale-105 border border-transparent hover:border-red-600/50"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-white font-medium text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div>
            <div className="h-6 w-48 bg-gray-800 rounded mb-6 skeleton" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-video bg-gray-800 rounded skeleton"
                />
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Results for "<span className="text-red-500">{searchParams.get('q')}</span>"
                </h2>
                <span className="ml-4 text-gray-500 text-sm">
                  {results.length} trailers found
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {results.map((trailer, index) => (
                <MovieCard
                  key={trailer.videoId}
                  trailer={trailer}
                  index={index}
                  onClick={() => openTrailer(trailer)}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <FiFilm className="text-gray-600 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No trailers found</h3>
            <p className="text-gray-400 mb-6">
              We couldn't find any trailers matching "{searchParams.get('q')}"
            </p>
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
                setSearchParams({});
              }}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

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

export default Search;
