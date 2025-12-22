import { useRef, useState } from "react";

export const VideoPlayer = ({ videoUrl, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div></div>
          <div className="flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-gray-600 rounded-full h-1 cursor-pointer">
              <div
                className="bg-red-600 h-full rounded-full"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-gray-300">{description}</p>}
      </div>
    </div>
  );
};
