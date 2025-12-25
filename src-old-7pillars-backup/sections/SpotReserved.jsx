import { motion } from 'framer-motion';
import CountdownTimer from '../components/CountdownTimer';

const SpotReserved = ({ position, expiresAt, onComplete }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-accent rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="text-center py-12 px-6 bg-gradient-to-br from-accent/20 to-gold/20">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
              SPOT RESERVED.
            </h1>
            <p className="text-xl text-textPrimary">
              Founding Council — Position #{position} of 500
            </p>
          </div>

          <div className="border-t border-accent/20" />

          {/* Countdown Section */}
          <div className="py-12 px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-3xl">⏱️</span>
              <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
                YOUR 24-HOUR WINDOW IS OPEN
              </h2>
            </div>

            <CountdownTimer expiresAt={expiresAt} />
          </div>

          <div className="border-t border-accent/20" />

          {/* Instructions */}
          <div className="py-12 px-6 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-textPrimary">
                TO LOCK YOUR SPOT:
              </h3>
              <div className="space-y-3 pl-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-textSecondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-textSecondary">□</span>
                  </div>
                  <p className="text-textSecondary">Complete your official registration</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border-2 border-textSecondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-textSecondary">□</span>
                  </div>
                  <p className="text-textSecondary">Cast your first vote</p>
                </div>
              </div>
            </div>

            <div className="bg-danger/10 border border-danger/30 rounded-lg p-6 space-y-2">
              <p className="text-danger font-bold">Miss this window?</p>
              <p className="text-textSecondary">Your spot goes to #501.</p>
            </div>

            <button
              onClick={onComplete}
              className="w-full px-8 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
            >
              COMPLETE REGISTRATION →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpotReserved;
