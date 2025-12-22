import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[500] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-5xl md:text-7xl font-black animate-pulse">
              <span className="text-red-600">JP</span>
              <span className="text-white">MOVIES</span>
            </span>
          </div>
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto relative">
            <div 
              className="h-full bg-red-600 rounded-full absolute"
              style={{
                animation: 'loadingBar 1.5s ease-in-out infinite'
              }}
            />
          </div>
          <p className="text-gray-500 mt-4 text-sm">Loading trailers...</p>
        </div>
        <style>{`
          @keyframes loadingBar {
            0% { width: 0%; left: 0%; }
            50% { width: 60%; left: 20%; }
            100% { width: 0%; left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
        <main>
          <Routes>
            <Route path="/" element={<Home selectedLanguage={selectedLanguage} />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
