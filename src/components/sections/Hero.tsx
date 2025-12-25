import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useTierCounts } from '../../hooks/useTierCounts';
import Button from '../ui/Button';

const TRUST_BADGES = [
  { name: 'Proton Mail', file: 'proton-mail.svg' },
  { name: 'ChainPass V.A.I.', file: 'chainpass-full-logo.svg' },
  { name: 'Microsoft Azure', file: 'microsoft-azure.svg' },
  { name: 'Swiss Made', file: 'swiss-made.svg' },
  { name: 'Twilio', file: 'Twilio.svg' },
  { name: 'TextNow', file: 'textnow.svg' },
  { name: 'SOC 2', file: 'badge-soc2-dark.svg' },
  { name: 'ISO 27001', file: 'iso-27001.svg' },
];

export default function Hero() {
  const { t } = useTranslation();
  const { getRemaining } = useTierCounts();
  const fcRemaining = getRemaining('founding_council');
  const isFull = fcRemaining <= 0;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById('reservation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden vai-section-primary"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F7DF3]/5 dark:from-[#4F7DF3]/10 to-transparent pointer-events-none" />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Logo - appears first */}
        <div className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <img
            src="/assets/vairify-logo-light.svg"
            alt="Vairify"
            className="h-[10.14rem] md:h-[13.52rem] dark:hidden"
          />
          <img
            src="/assets/vairify-logo-dark.svg"
            alt="Vairify"
            className="h-[10.14rem] md:h-[13.52rem] hidden dark:block"
          />
        </div>

        {/* Headline - appears second */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          <span className={`
            block
            transition-all duration-700 delay-150
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            text-[var(--vai-text-primary)]
          `}>
            {t('hero.headline1')}
          </span>
          <span className={`
            block
            transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            text-[#00d4aa]
          `}>
            {t('hero.headline2')}
          </span>
        </h1>

        {/* Subheadline - appears third */}
        <p className={`
          text-xl text-[var(--vai-text-secondary)] mb-8
          transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {t('hero.subhead')}
        </p>

        {/* CTA Button - appears fourth with glow */}
        <div className={`
          mb-12
          transition-all duration-700 delay-400
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="
              relative group
              shadow-lg hover:shadow-xl
              transform hover:scale-105 active:scale-100
              transition-all duration-200
            "
          >
            <span className="absolute inset-0 rounded-lg bg-[#00d4aa] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
            <span className="relative">{t('hero.cta')}</span>
          </Button>
        </div>

        {/* Trust Badges - appears fifth, staggered */}
        <div className={`
          transition-all duration-700 delay-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <div className="bg-gray-50 dark:bg-[#12121a] py-8 px-6 rounded-2xl mb-12 border border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.name}
                  className="vai-card p-3 flex items-center justify-center h-20 shadow-sm"
                >
                  <img
                    src={`/assets/${badge.file}`}
                    alt={badge.name}
                    className="h-12 max-h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator - appears last, with animation */}
        <div className={`
          mb-8 flex flex-col items-center
          transition-all duration-700 delay-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <span className="text-[var(--vai-text-secondary)] font-medium mb-2">
            {t('hero.scroll')}
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#00d4aa]" />
          </div>
        </div>

        {/* Floating urgency badge */}
        <div className={`
          inline-block
          px-6 py-3
          bg-white dark:bg-[#1a1a2e]
          border-2 border-amber-400
          rounded-full
          shadow-lg
          transition-all duration-700 delay-900
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}>
          <span className="text-amber-600 dark:text-amber-400 font-bold">
            {isFull ? 'FULL:' : 'Closing Soon:'}
          </span>
          <span className="text-[var(--vai-text-secondary)] ml-2">
            {t('hero.spots')}
          </span>
        </div>
      </div>
    </section>
  );
}
