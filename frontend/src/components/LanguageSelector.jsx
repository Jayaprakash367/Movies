import { useState } from 'react';
import { MdLanguage } from 'react-icons/md';

export const LANGUAGES = [
  { code: 'all', name: 'All Languages', flag: '🌍', native: 'All' },
  { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLanguageSelect = (langName) => {
    onLanguageChange(langName);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
      >
        <MdLanguage className="text-lg text-red-600" />
        <span className="text-sm font-medium hidden md:inline">{selectedLanguage}</span>
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-lg overflow-hidden shadow-2xl z-50">
          <div className="p-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-all ${
                  selectedLanguage === lang.name
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-[#282828] text-gray-200'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{lang.name}</p>
                  <p className="text-xs text-gray-400">{lang.native}</p>
                </div>
                {selectedLanguage === lang.name && (
                  <span className="text-lg">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
