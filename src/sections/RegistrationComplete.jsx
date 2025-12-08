import { useState } from 'react';
import { motion } from 'framer-motion';

const RegistrationComplete = ({ memberNumber, referralCode }) => {
  const [copied, setCopied] = useState(false);

  const referralLink = `vairify.com/join/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Vairify Founding Council',
        text: 'Reserve your spot in the Vairify Founding Council',
        url: `https://${referralLink}`
      });
    } else {
      handleCopy();
    }
  };

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
              YOU'RE LOCKED IN.
            </h1>
            <p className="text-xl text-textPrimary mb-2">
              Founding Council — Member #{memberNumber}
            </p>
            <p className="text-2xl font-bold text-gold">
              PERMANENT
            </p>
          </div>

          <div className="border-t border-accent/20" />

          {/* Confirmation */}
          <div className="py-12 px-6 text-center space-y-6">
            <div className="space-y-2 text-textSecondary">
              <p>Your live demo is ready.</p>
              <p>Your vote has been counted.</p>
              <p className="text-textPrimary font-bold">
                Your fingerprints are on this platform. Forever.
              </p>
            </div>

            <button className="px-10 py-4 bg-accent hover:bg-accent/90 text-background font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50">
              LAUNCH DEMO →
            </button>
          </div>

          <div className="border-t border-accent/20" />

          {/* Referral Section */}
          <div className="py-12 px-6 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">
                BRING YOUR PEOPLE.
              </h2>
              <div className="space-y-2 text-textSecondary">
                <p>Everyone who joins through you?</p>
                <p className="text-xl text-gold font-bold">
                  10% of everything they spend. Forever.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-textSecondary mb-3 text-center">
                Your referral link:
              </p>
              <div className="bg-background border border-accent/30 rounded-lg p-4 flex items-center justify-between gap-4">
                <code className="text-accent font-mono text-sm break-all">
                  {referralLink}
                </code>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded transition-colors text-sm font-bold"
                >
                  {copied ? '✓ COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCopy}
                className="flex-1 px-6 py-3 bg-card border border-accent/30 hover:border-accent text-textPrimary font-bold rounded-full transition-all"
              >
                COPY LINK
              </button>
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3 bg-accent hover:bg-accent/90 text-background font-bold rounded-full transition-all"
              >
                SHARE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationComplete;
