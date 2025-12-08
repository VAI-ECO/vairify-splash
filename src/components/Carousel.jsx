import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ items, onCardClick, showDots = true, showArrows = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
  };

  // Get visible items based on screen size
  const getVisibleItems = () => {
    // Mobile: 1 card, Tablet: 2 cards, Desktop: 3 cards
    const visibleCount = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push({ ...items[index], index });
    }
    return visible;
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {getVisibleItems().map((item, idx) => (
            <motion.div
              key={`${item.number}-${idx}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-0"
              onClick={() => onCardClick && onCardClick(item)}
            >
              <div className="bg-card rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent transition-all duration-300 h-full">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-gold/10" />
                  <div className="relative z-10 w-16 h-16 rounded-full bg-accent/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-mono font-bold">{item.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2 text-textPrimary leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-textSecondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      {showArrows && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors z-10"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-textPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors z-10"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-textPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent w-8'
                  : 'bg-textSecondary/30 hover:bg-textSecondary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
