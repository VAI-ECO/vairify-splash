import { motion } from 'framer-motion';

const WeBuiltIt = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-textPrimary">
            THIS SOUNDS TOO GOOD TO BE TRUE.
          </h2>
          <p className="text-xl text-textSecondary mb-4">We know.</p>
          <p className="text-xl text-textSecondary">Here's the difference:</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-6xl font-bold text-gradient mb-8">
            WE ALREADY BUILT IT.
          </h3>
        </motion.div>

        <div className="space-y-16">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-textSecondary border-y border-textSecondary/20 py-8"
          >
            <p>Most startups launch a skeleton. Promise features. Build over years.</p>
            <p>Some overbuild in a vacuum. Launch something massive nobody asked for.</p>
            <p className="text-accent font-bold">We did neither.</p>
          </motion.div>

          {/* The Hybrid Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gold mb-8">
              THE HYBRID APPROACH
            </h3>
            <p className="text-xl text-center text-textPrimary font-bold">
              We built EVERYTHING. Then we split it in two.
            </p>
          </motion.div>

          {/* The 7 Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-lg border border-accent/30"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-accent mb-6">
              THE 7 PILLARS — RELEASING NOW.
            </h3>
            <div className="space-y-4 text-lg text-textSecondary">
              <p>Safety can't wait.</p>
              <p>We perfected it. We tested it. It's done.</p>
              <p>You need this now. Everyone does.</p>
              <p className="text-textPrimary font-bold">
                That's why it's free. That's why it's ready.
              </p>
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-lg border border-gold/30"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gold mb-6">
              PREMIUM — BUILT. BUT WE WANT YOUR VOICE.
            </h3>
            <div className="space-y-4 text-lg text-textSecondary">
              <p>Vairify Now. Invitations. Vairidate. VairiPay.</p>
              <p>Social Hub. Directory. Calendar. QR Codes.</p>
              <p className="text-textPrimary font-bold">All built. All working.</p>
              <p className="pt-4">But here's the thing:</p>
              <p className="text-textPrimary">You're the ones who are going to USE them.</p>
              <p className="text-textPrimary">So let's make sure they're EXACTLY what you need.</p>

              <div className="space-y-2 pt-4">
                <p>What do you want first?</p>
                <p>What would make your life easier?</p>
                <p>What's missing?</p>
                <p>What needs to change?</p>
              </div>

              <p className="text-textPrimary font-bold pt-4">
                We didn't build this to guess.
              </p>
              <p className="text-textPrimary font-bold">
                We built this so we can move FAST.
              </p>

              <p className="text-accent font-bold pt-4">
                Your suggestion? Implemented in days. Not months.
              </p>

              <p className="pt-4">
                Every 5 days, we release another Premium feature.
              </p>
              <p>Voted on by you. Shaped by you. Built for you.</p>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 border-t border-textSecondary/20 pt-12"
          >
            <p className="text-2xl text-textPrimary font-bold">
              This isn't focus group theater.
            </p>
            <div className="space-y-4 text-xl text-textSecondary">
              <p>You tell us what you want.</p>
              <p>We build it.</p>
              <p>5 days later, it's live.</p>
            </div>
            <p className="text-2xl text-accent font-bold pt-4">
              That's the deal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeBuiltIt;
