import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiBell, FiChevronDown, FiUser, FiMenu } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ selectedLanguage, onLanguageChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Action', path: '/search?q=action' },
    { name: 'Comedy', path: '/search?q=comedy' },
    { name: 'Horror', path: '/search?q=horror' },
    { name: 'Sci-Fi', path: '/search?q=sci-fi' },
    { name: 'Drama', path: '/search?q=drama' },
    { name: 'Thriller', path: '/search?q=thriller' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/95 shadow-2xl shadow-black/50' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu className="text-2xl" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-1 group">
              <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
                <span className="text-red-600">JP</span>
                <span className="text-white">MOVIES</span>
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 ml-12">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group py-2"
                >
                  {cat.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3 md:space-x-5">
              {/* Language Selector */}
              <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} />

              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Titles, genres..."
                        className="w-40 md:w-64 pl-10 pr-10 py-2 bg-black/90 border border-white/30 text-white rounded focus:border-red-500 focus:outline-none text-sm transition-all"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <FiX />
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white hover:text-red-500 transition-colors p-2"
                  >
                    <FiSearch className="text-xl" />
                  </button>
                )}
              </div>

              {/* Notifications */}
              <button className="hidden md:block text-white hover:text-red-500 transition-colors relative">
                <FiBell className="text-xl" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center overflow-hidden">
                  <FiUser className="text-white text-sm" />
                </div>
                <FiChevronDown className="hidden md:block text-white text-sm group-hover:rotate-180 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        <div 
          className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-0 left-0 h-full w-64 bg-black/95 border-r border-white/10 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="pt-20 px-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.name}
                to={cat.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-300 hover:text-white hover:pl-2 transition-all border-b border-white/5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
