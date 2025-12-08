import { motion } from 'framer-motion';
import SpotCounter from '../components/SpotCounter';

const Hero = ({ onCTAClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-gold/10 animate-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          NEVER HAVE ANOTHER{' '}
          <span className="text-gradient">UNVERIFIED ENCOUNTER.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-textSecondary mb-12 max-w-3xl mx-auto"
        >
          5 minutes to set up. Seconds to verify. Free to try.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={onCTAClick}
            className="px-12 py-5 bg-accent hover:bg-accent/90 text-background font-bold text-lg md:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
          >
            RESERVE YOUR SPOT — $0
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center gap-2 text-textSecondary animate-bounce">
            <span className="text-sm">See how it works</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Counter at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <SpotCounter />
      </motion.div>
    </section>
  );
};

export default Hero;
