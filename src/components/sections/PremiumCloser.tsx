import { useTranslation } from 'react-i18next';

export default function PremiumCloser() {
  const { t } = useTranslation();

  return (
    <section className="
      py-24 px-6
      vai-section-secondary
      border-y border-[var(--vai-border)]
    ">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-4 text-lg text-[var(--vai-text-secondary)]">
          <p>{t('premiumCloser.p1')}</p>
          <p>{t('premiumCloser.p2')}</p>
          <p>{t('premiumCloser.p3')}</p>
          <p className="text-xl font-bold text-[var(--vai-text-primary)]">
            {t('premiumCloser.p4')}
          </p>
          <p>{t('premiumCloser.p5')}</p>
          <p className="text-xl font-bold text-[var(--vai-text-primary)]">
            {t('premiumCloser.p6')}
          </p>
          <p>{t('premiumCloser.p7')}</p>
          <p>{t('premiumCloser.p8')}</p>
          <p className="text-xl font-bold text-[var(--vai-text-primary)]">
            {t('premiumCloser.p9')}
          </p>
        </div>

        {/* "Days." emphasis */}
        <div className="mt-8">
          <span className="
            text-7xl md:text-8xl font-black
            text-[#00d4aa]
            drop-shadow-lg
          ">
            {t('premiumCloser.p10')}
          </span>
        </div>

        <div className="mt-8 space-y-4 text-lg text-[var(--vai-text-secondary)]">
          <p>{t('premiumCloser.p11')}</p>
          <p>{t('premiumCloser.p12')}</p>
        </div>
      </div>
    </section>
  );
}
