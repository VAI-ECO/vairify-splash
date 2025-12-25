import { useState } from 'react';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';
import VideoModal from '../components/VideoModal';
import { premiumFeatures } from '../data/pillars';

const Premium = ({ onCTAClick }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCardClick = (feature) => {
    setSelectedVideo(feature);
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-textPrimary">
            PREMIUM — BECAUSE YOU WANT IT
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary mb-2">
            Safety is free. This is everything else.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gold">
            $29.99/month
          </p>
        </motion.div>

        <Carousel items={premiumFeatures} onCardClick={handleCardClick} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl text-textSecondary mb-4">
            Because you want it. Not because you have to.
          </p>
          <p className="text-lg text-accent mb-8">
            Safety is already free.
          </p>

          <button
            onClick={onCTAClick}
            className="px-10 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
          >
            RESERVE YOUR SPOT
          </button>
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

export default Premium;
