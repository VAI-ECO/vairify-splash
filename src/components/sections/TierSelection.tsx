import { useTranslation } from 'react-i18next';
import { useTierCounts } from '../../hooks/useTierCounts';
import type { Tier } from '../../types';

// Hardcoded tier status - can be made dynamic later when connected to real data
const TIER_STATUS: Record<Tier, { status: 'closing' | 'closed' | 'open' }> = {
  founding_council: {
    status: 'closing', // 'closing' | 'closed' | 'open'
  },
  first_mover: {
    status: 'open',
  },
  early_access: {
    status: 'open',
  },
};

interface TierCardProps {
  tier: Tier;
  icon: string;
  name: string;
  spots: string;
  benefits: string[];
  color: string;
  borderColor: string;
  remaining: number;
}

function TierCard({ icon, name, spots, benefits, color, borderColor, remaining, tier }: TierCardProps) {
  const tierStatus = TIER_STATUS[tier].status;
  const isClosed = tierStatus === 'closed';
  const isClosing = tierStatus === 'closing';
  const isOpen = tierStatus === 'open';

  return (
    <div className={`
      p-8
      bg-[#1e293b]
      border-2 ${borderColor}
      rounded-xl
      shadow-md
      text-center
      relative overflow-hidden
      ${isClosing ? 'shadow-[0_0_40px_rgba(255,215,0,0.4)]' : ''}
      ${tier === 'first_mover' && isOpen ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' : ''}
      ${tier === 'early_access' && isOpen ? 'shadow-[0_0_15px_rgba(0,212,170,0.2)]' : ''}
      hover:shadow-xl hover:scale-[1.02]
      transition-all duration-300
      ${isClosed ? 'opacity-50 grayscale' : ''}
    `}>
      {/* Glow effect for closing tiers */}
      {isClosing && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent pointer-events-none" />
      )}

      <div className="relative">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Name */}
        <h3 className={`text-xl font-black mb-2 ${color}`}>
          {name}
        </h3>

        {/* Count */}
        <p className="text-white mb-1">
          {spots}
        </p>

        {/* Status - dynamic based on tier status */}
        <p className={`text-sm font-bold mb-4 ${
          isClosed ? 'text-gray-500' :
          isClosing ? 'text-amber-400' :
          tier === 'first_mover' ? 'text-[#4F7DF3]' : 'text-[#00d4aa]'
        }`}>
          {isClosed ? 'CLOSED' :
           isClosing ? 'Closing Soon' :
           `${remaining} remaining`}
        </p>

        {/* Benefits */}
        <ul className="space-y-1">
          {benefits.map((benefit, i) => (
            <li key={i} className="text-[#94a3b8]">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TierSelection() {
  const { t } = useTranslation();
  const { getRemaining } = useTierCounts();

  const tiers = [
    {
      tier: 'founding_council' as Tier,
      icon: '🔥',
      name: t('tiers.cards.fc.name'),
      spots: t('tiers.cards.fc.spots'),
      benefits: t('tiers.cards.fc.benefits', { returnObjects: true }) as string[],
      color: 'text-[#ffd700]',
      borderColor: 'border-[#ffd700]',
      remaining: getRemaining('founding_council'),
    },
    {
      tier: 'first_mover' as Tier,
      icon: '⚡',
      name: t('tiers.cards.fm.name'),
      spots: t('tiers.cards.fm.spots'),
      benefits: t('tiers.cards.fm.benefits', { returnObjects: true }) as string[],
      color: 'text-[#3B82F6]',
      borderColor: 'border-[#3B82F6]',
      remaining: getRemaining('first_mover'),
    },
    {
      tier: 'early_access' as Tier,
      icon: '🚀',
      name: t('tiers.cards.ea.name'),
      spots: t('tiers.cards.ea.spots'),
      benefits: t('tiers.cards.ea.benefits', { returnObjects: true }) as string[],
      color: 'text-[#4F7DF3]',
      borderColor: 'border-[#4F7DF3]',
      remaining: getRemaining('early_access'),
    },
  ];

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="
            text-3xl md:text-4xl font-black
            text-[var(--vai-text-primary)]
            mb-4
          ">
            {t('tiers.title')}
          </h2>
          <p className="text-lg text-[var(--vai-text-secondary)]">
            {t('tiers.subtitle')}
          </p>
          <p className="text-2xl font-bold text-[#00d4aa] mt-4">
            {t('tiers.notWaitlist')}
          </p>
          <p className="text-[var(--vai-text-secondary)] mt-2 max-w-xl mx-auto">
            {t('tiers.impact')}
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <TierCard key={tier.tier} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
