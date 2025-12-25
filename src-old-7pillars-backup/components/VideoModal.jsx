import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoModal = ({ isOpen, videoUrl, title, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Auto-play video when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => console.log('Auto-play prevented:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-danger transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-textPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Container */}
          <div className="bg-card rounded-lg overflow-hidden shadow-2xl">
            {title && (
              <div className="px-6 py-4 border-b border-textSecondary/10">
                <h3 className="text-xl font-bold text-textPrimary">{title}</h3>
              </div>
            )}

            <div className="relative aspect-video bg-black">
              {/* Placeholder for now since we don't have actual videos */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-gold/20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/30 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-textSecondary text-sm">
                    Video placeholder - {videoUrl}
                  </p>
                  <p className="text-textSecondary/60 text-xs mt-2">
                    Actual video will be loaded here
                  </p>
                </div>
              </div>

              {/* Uncomment this when you have actual videos */}
              {/* <video
                ref={videoRef}
                className="w-full h-full"
                controls
                muted={false}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
