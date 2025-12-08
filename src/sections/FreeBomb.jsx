import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FreeBomb = () => {
  const [price, setPrice] = useState(99);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    const prices = [99, 49, 29, 9, 0];
    let index = 0;

    const interval = setInterval(() => {
      if (index < prices.length) {
        setPrice(prices[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-textPrimary"
        >
          ALL OF THAT?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
          className="mb-12"
        >
          <div className="text-7xl md:text-9xl font-bold font-mono mb-4">
            {price > 0 ? (
              <span className="text-textSecondary line-through">${price}</span>
            ) : (
              <span className="text-gradient">FREE</span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
          className="space-y-6 text-xl md:text-2xl text-textSecondary"
        >
          <p>Not "free trial."</p>
          <p>Not "free for 30 days."</p>
          <p>Not "free with an asterisk."</p>
          <p className="text-3xl md:text-4xl font-bold text-accent pt-8">
            Free. Forever. Every safety feature.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeBomb;
