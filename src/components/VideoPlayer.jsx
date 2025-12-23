import React, { useState } from 'react';
// import './VideoPlayer.css';

const PlayIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="play-icon-svg">
    <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.95"/>
    <path d="M32 25L58 40L32 55V25Z" fill="#2563eb"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const VideoPlayer = ({ videoId = "EaKihYESXvw", buttonText = "Watch Our Story" }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <>
      {/* Video Button Section */}
      <div className="video-section">
        <button 
          className="video-play-button"
          onClick={handleVideoClick}
          aria-label="Watch introduction video"
        >
          <div className="play-button-ring"></div>
          <div className="play-button-ring-2"></div>
          <div className="play-button-content">
            <PlayIcon />
            <span className="play-button-text">{buttonText}</span>
          </div>
        </button>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal" onClick={handleCloseVideo}>
          <div className="video-modal-backdrop"></div>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close-button" onClick={handleCloseVideo}>
              <CloseIcon />
            </button>
            <div className="video-player-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;