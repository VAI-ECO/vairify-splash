import { motion } from 'framer-motion';

const tierData = [
  {
    name: 'FOUNDING COUNCIL',
    price: 'FREE forever',
    spots: '500',
    earlyAccess: '10 days early',
    liveDemo: 'Immediate',
    governance: 'Full voting',
    badge: 'Founder',
    revenueShare: '10% forever'
  },
  {
    name: 'FIRST MOVERS',
    price: '50% off forever',
    spots: '5,000',
    earlyAccess: 'Launch day',
    liveDemo: 'After FC fills',
    governance: 'Advisory only',
    badge: 'Pioneer',
    revenueShare: '10% forever'
  },
  {
    name: 'EARLY ACCESS',
    price: '20% off first year',
    spots: 'Unlimited',
    earlyAccess: 'Launch day',
    liveDemo: 'After launch',
    governance: 'None',
    badge: 'Early',
    revenueShare: '5% first year'
  }
];

const Tiers = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-textPrimary">
            YOUR TIER LOCKS ON LAUNCH DAY.
          </h2>
        </motion.div>

        {/* Tier Table - Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden md:block overflow-x-auto mb-12"
        >
          <table className="w-full bg-card rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-accent/10 border-b border-accent/20">
                <th className="px-6 py-4 text-left text-textSecondary font-bold"></th>
                {tierData.map((tier, index) => (
                  <th key={index} className={`px-6 py-4 text-center font-bold ${
                    index === 0 ? 'text-accent' : 'text-textPrimary'
                  }`}>
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Price</td>
                {tierData.map((tier, index) => (
                  <td key={index} className={`px-6 py-4 text-center ${
                    index === 0 ? 'text-accent font-bold' : 'text-textSecondary'
                  }`}>
                    {tier.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Spots</td>
                {tierData.map((tier, index) => (
                  <td key={index} className="px-6 py-4 text-center text-textSecondary">
                    {tier.spots}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Early Access</td>
                {tierData.map((tier, index) => (
                  <td key={index} className={`px-6 py-4 text-center ${
                    index === 0 ? 'text-accent font-bold' : 'text-textSecondary'
                  }`}>
                    {tier.earlyAccess}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Live Demo</td>
                {tierData.map((tier, index) => (
                  <td key={index} className="px-6 py-4 text-center text-textSecondary">
                    {tier.liveDemo}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Governance</td>
                {tierData.map((tier, index) => (
                  <td key={index} className={`px-6 py-4 text-center ${
                    index === 0 ? 'text-accent font-bold' : 'text-textSecondary'
                  }`}>
                    {tier.governance}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-textSecondary/10">
                <td className="px-6 py-4 font-bold text-textPrimary">Badge</td>
                {tierData.map((tier, index) => (
                  <td key={index} className="px-6 py-4 text-center text-textSecondary">
                    {tier.badge}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold text-textPrimary">Revenue Share</td>
                {tierData.map((tier, index) => (
                  <td key={index} className={`px-6 py-4 text-center ${
                    index === 0 ? 'text-gold font-bold' : 'text-textSecondary'
                  }`}>
                    {tier.revenueShare}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Tier Cards - Mobile */}
        <div className="md:hidden space-y-6 mb-12">
          {tierData.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card p-6 rounded-lg border ${
                index === 0 ? 'border-accent' : 'border-textSecondary/20'
              }`}
            >
              <h3 className={`text-xl font-bold mb-4 ${
                index === 0 ? 'text-accent' : 'text-textPrimary'
              }`}>
                {tier.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Price:</span>
                  <span className={index === 0 ? 'text-accent font-bold' : 'text-textPrimary'}>
                    {tier.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Spots:</span>
                  <span className="text-textPrimary">{tier.spots}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Early Access:</span>
                  <span className="text-textPrimary">{tier.earlyAccess}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Live Demo:</span>
                  <span className="text-textPrimary">{tier.liveDemo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Governance:</span>
                  <span className="text-textPrimary">{tier.governance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Badge:</span>
                  <span className="text-textPrimary">{tier.badge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Revenue Share:</span>
                  <span className={index === 0 ? 'text-gold font-bold' : 'text-textPrimary'}>
                    {tier.revenueShare}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 24-Hour Rule Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-danger/10 border-2 border-danger rounded-lg overflow-hidden"
        >
          <div className="bg-danger/20 px-6 py-3 border-b border-danger/30">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <span className="text-lg font-bold text-danger">HERE'S THE CATCH</span>
            </div>
          </div>

          <div className="p-8 space-y-6 text-textSecondary">
            <p>Reserving your spot is step one.</p>
            <p>But a reservation isn't a seat.</p>

            <div className="bg-card/50 p-6 rounded-lg space-y-4">
              <p className="text-textPrimary font-bold">You have 24 HOURS to:</p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>Complete your official registration</li>
                <li>Cast your first vote</li>
              </ol>
            </div>

            <div className="space-y-4">
              <p className="text-textPrimary font-bold">Miss that window?</p>
              <p>Your spot goes to the next person in line.</p>
              <p className="text-danger font-bold">Your tier is gone. Forever.</p>
            </div>

            <div className="border-t border-danger/30 pt-6 space-y-4">
              <p>We're not holding spots for people who aren't serious.</p>
              <p>500 seats. Thousands waiting.</p>
            </div>

            <p className="text-xl text-textPrimary font-bold text-center pt-4">
              Show up or step aside.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tiers;
