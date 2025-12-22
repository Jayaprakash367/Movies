const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black z-[500] flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <span className="text-5xl md:text-7xl font-black">
            <span className="text-red-600">JP</span>
            <span className="text-white">MOVIES</span>
          </span>
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-red-600 rounded-full animate-loading-bar" style={{
            animation: 'loading-bar 1.5s ease-in-out infinite'
          }} />
        </div>
        
        <p className="text-gray-500 mt-4 text-sm">Loading trailers...</p>
      </div>
      
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
