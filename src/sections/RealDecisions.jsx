import { motion } from 'framer-motion';
import { decisions } from '../data/pillars';
import SpotCounter from '../components/SpotCounter';

const DecisionCard = ({ decision, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-card border border-accent/20 rounded-lg overflow-hidden"
  >
    <div className="bg-accent/10 px-6 py-3 border-b border-accent/20">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📋</span>
        <span className="text-sm font-bold text-accent">PENDING VOTE</span>
      </div>
    </div>

    <div className="p-6 space-y-4">
      <h3 className="text-xl font-bold text-textPrimary">
        {decision.title}
      </h3>

      <p className="text-textSecondary leading-relaxed">
        {decision.context}
      </p>

      <div className="space-y-2">
        <p className="text-sm font-bold text-textPrimary">Options:</p>
        {decision.options.map((option, idx) => (
          <p key={idx} className="text-sm text-textSecondary pl-4">
            {option}
          </p>
        ))}
      </div>

      <p className="text-textPrimary font-bold italic pt-4">
        {decision.tension}
      </p>
    </div>
  </motion.div>
);

const RealDecisions = ({ onCTAClick }) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-textPrimary">
            THIS IS WHY YOU GET IN 10 DAYS EARLY.
          </h2>
          <div className="text-lg md:text-xl text-textSecondary space-y-4 max-w-3xl mx-auto">
            <p>We have decisions to make before launch.</p>
            <p>Real ones. With real consequences.</p>
            <p className="text-textPrimary font-bold pt-4">
              We don't want to make them.
            </p>
            <p className="text-accent font-bold">
              We want YOU to make them.
            </p>
            <p className="pt-4">Here's what's on the table right now:</p>
          </div>
        </motion.div>

        {/* Decision Cards */}
        <div className="space-y-6 mb-12">
          {decisions.map((decision, index) => (
            <DecisionCard key={index} decision={decision} index={index} />
          ))}
        </div>

        {/* See All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-textSecondary mb-4">These aren't the only ones.</p>
          <button className="text-accent hover:text-accent/80 font-bold text-lg flex items-center gap-2 mx-auto">
            SEE ALL PENDING DECISIONS
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-sm text-textSecondary mt-4">
            New decisions posted as they come up.
          </p>
          <p className="text-sm text-textSecondary">
            Voting opens when you're inside.
          </p>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-textSecondary/20 pt-12 space-y-8"
        >
          <div className="text-center space-y-4 text-lg">
            <p className="text-textPrimary font-bold">This is YOUR platform.</p>
            <p className="text-textSecondary">We built the engine. You steer it.</p>
            <p className="text-textSecondary">
              But only if you're in the room.
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xl text-textPrimary">
              500 seats. 10 days early.
            </p>
            <p className="text-danger font-bold">
              Because these decisions can't wait.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={onCTAClick}
              className="px-10 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
            >
              RESERVE MY SPOT — I WANT TO VOTE
            </button>
            <SpotCounter />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealDecisions;
