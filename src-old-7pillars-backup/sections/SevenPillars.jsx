import { useState } from 'react';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import VideoModal from '../components/VideoModal';
import { sevenPillars } from '../data/pillars';

const SevenPillars = ({ onCTAClick }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCardClick = (pillar) => {
    setSelectedVideo(pillar);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-textPrimary">
            THE 7 PILLARS OF PROTECTION
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary">
            What if every person you met passed all seven?
          </p>
        </motion.div>

        <Carousel items={sevenPillars} onCardClick={handleCardClick} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl text-textSecondary mb-8">
            5 minutes to set up. Seconds to use. Every meeting.
          </p>

          <div className="border-t border-textSecondary/20 pt-8 mt-8">
            <p className="text-xl text-textPrimary mb-6">Seen enough?</p>
            <button
              onClick={onCTAClick}
              className="px-10 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50 mb-4"
            >
              RESERVE YOUR SPOT — $0
            </button>
            <p className="text-sm text-textSecondary">or keep scrolling ↓</p>
          </div>
        </motion.div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        videoUrl={selectedVideo?.videoUrl}
        title={selectedVideo?.title}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default SevenPillars;
