import { motion } from 'framer-motion';

const ThePain = () => {
  const painPoints = [
    "The reference that checked out — until he didn't.",
    "The deposit that vanished with her.",
    "The cash in your bag that made you a target.",
    "The review that destroyed you — from someone you never met."
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-textPrimary"
        >
          You know the feeling.
        </motion.h2>

        <div className="space-y-8 mb-16">
          {painPoints.map((point, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-xl md:text-2xl text-textSecondary leading-relaxed"
            >
              {point}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl text-textPrimary font-bold">
            You've been screening with hope.
          </p>
          <p className="text-2xl md:text-3xl text-danger font-bold">
            Hope isn't protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThePain;
