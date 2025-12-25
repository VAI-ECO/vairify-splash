import { motion } from 'framer-motion';
import { littleThings } from '../data/pillars';

const LittleThings = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-textPrimary">
            THE MOST ADVANCED PLATFORM EVER BUILT FOR THIS.
          </h2>
          <p className="text-xl md:text-2xl text-textSecondary">
            But we didn't forget the small stuff.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {littleThings.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              className="bg-card p-4 rounded-lg border border-accent/10 hover:border-accent/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-sm font-bold mb-1 text-textPrimary group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-xl text-textPrimary">
            Big stuff protects you in meetings.
          </p>
          <p className="text-xl text-textSecondary">
            Small stuff protects you everywhere else.
          </p>
          <p className="text-xl text-accent font-bold">
            We built both.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LittleThings;
