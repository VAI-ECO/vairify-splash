import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = ({ showAfterPercent = 25, text = "Ready?", buttonText = "RESERVE — FREE", onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage >= showAfterPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterPercent]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-sm"
        >
          <div className="bg-card/95 backdrop-blur-md border-t md:border border-accent/30 md:rounded-lg shadow-2xl shadow-accent/20">
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <span className="text-textPrimary font-bold hidden md:block">{text}</span>
              <button
                onClick={onClick}
                className="flex-1 md:flex-none px-6 py-3 bg-accent hover:bg-accent/90 text-background font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
