import { motion } from 'framer-motion';
import { businessFeatures } from '../data/pillars';

const Businesses = ({ onCTAClick }) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-textPrimary">
            BUSINESSES — WE DIDN'T FORGET YOU.
          </h2>
          <div className="text-lg md:text-xl text-textSecondary space-y-2">
            <p>Agencies. Studios. Venues.</p>
            <p>Your employees. Your liability. Your risk.</p>
            <p className="text-accent font-bold pt-2">Until now.</p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {businessFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-lg border border-accent/20 hover:border-accent/50 transition-colors"
            >
              <h3 className="text-xl font-bold mb-4 text-accent">
                {feature.title}
              </h3>
              <p className="text-textSecondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card border border-accent/30 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-textPrimary">
            BUSINESS PACKAGES
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-lg">
              <span className="text-textSecondary">1 Employee:</span>
              <span className="text-accent font-bold">$69</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-textSecondary">4 Employees:</span>
              <span className="text-accent font-bold">$199</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-textSecondary">10 Employees:</span>
              <span className="text-accent font-bold">$499</span>
            </div>
            <div className="flex justify-between items-center text-lg border-t border-textSecondary/20 pt-4">
              <span className="text-textSecondary">Non-Service Listing:</span>
              <span className="text-accent font-bold">$99</span>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded p-4 mb-6">
            <p className="text-sm text-center text-textPrimary">
              <span className="text-gold font-bold">+ 6 months FREE Premium</span> for every employee (waitlist bonus)
            </p>
          </div>

          <button
            onClick={onCTAClick}
            className="w-full px-8 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105"
          >
            JOIN BUSINESS WAITLIST
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Businesses;
