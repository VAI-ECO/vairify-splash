import { useState } from 'react';
import { motion } from 'framer-motion';
import SpotCounter from '../components/SpotCounter';

const FinalCTA = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await onSubmit(email);
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-textPrimary">
            RESERVE YOUR SPOT NOW.
          </h2>

          <div className="text-lg md:text-xl text-textSecondary space-y-4 max-w-2xl mx-auto">
            <p>$0 to register.</p>
            <p>Immediate access to the live demo.</p>
            <p>24 hours to lock in your tier.</p>
          </div>

          <p className="text-2xl text-accent font-bold">
            This is your window.
          </p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-card border border-accent/30 rounded-full text-textPrimary placeholder-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50 whitespace-nowrap"
              >
                {isSubmitting ? 'RESERVING...' : 'RESERVE — FREE'}
              </button>
            </div>
          </form>

          <SpotCounter />

          {/* Divider */}
          <div className="border-t border-textSecondary/20 my-12" />

          {/* Final Warning */}
          <div className="space-y-6 text-lg text-textSecondary max-w-2xl mx-auto">
            <p className="text-textPrimary font-bold">
              Clock starts when you click.
            </p>
            <p>24 hours. Registration + first vote.</p>
            <p>Or your spot goes to someone who showed up ready.</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-textSecondary/20"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xl font-bold text-accent mb-2">
                Vairify — the first V.A.I. platform.
              </p>
              <p className="text-sm text-textSecondary">
                Powered by ChainPass.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-textSecondary">
              <a href="#" className="hover:text-accent transition-colors">About</a>
              <a href="#" className="hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms</a>
              <a href="#" className="hover:text-accent transition-colors">Contact</a>
            </div>

            {/* Social */}
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card hover:bg-accent/20 flex items-center justify-center transition-colors">
                <span className="text-textSecondary hover:text-accent">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card hover:bg-accent/20 flex items-center justify-center transition-colors">
                <span className="text-textSecondary hover:text-accent">IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card hover:bg-accent/20 flex items-center justify-center transition-colors">
                <span className="text-textSecondary hover:text-accent">R</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card hover:bg-accent/20 flex items-center justify-center transition-colors">
                <span className="text-textSecondary hover:text-accent">B</span>
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default FinalCTA;
