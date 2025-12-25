import { useTranslation } from 'react-i18next';

export default function Pain() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 vai-section-secondary border-y border-[var(--vai-border)]">
      <div className="max-w-3xl mx-auto text-center">
        {/* Opening */}
        <h2 className="
          text-3xl md:text-4xl font-bold
          text-[var(--vai-text-primary)]
          mb-8
        ">
          {t('pain.p1')}
        </h2>

        {/* Pain copy */}
        <div className="space-y-4 text-lg text-[var(--vai-text-secondary)]">
          <p>
            {t('pain.p2')}
          </p>
          <p className="font-medium text-[var(--vai-text-primary)]">
            {t('pain.p3')}
          </p>
          <p>
            {t('pain.p4')}
          </p>
          <p className="text-xl font-bold text-[var(--vai-text-primary)]">
            {t('pain.p5')}
          </p>
          <p>
            {t('pain.p5b')}
          </p>
        </div>

        {/* "free." with emphasis - if this section contains it */}
        {t('pain.p6').toLowerCase().includes('free') && (
          <div className="mt-8 mb-8">
            <span className="
              text-6xl md:text-7xl font-black
              text-[#00d4aa]
              drop-shadow-lg
            ">
              {t('pain.p6')}
            </span>
          </div>
        )}

        {!t('pain.p6').toLowerCase().includes('free') && (
          <p className="text-2xl text-[var(--vai-text-secondary)] mt-8 mb-4">
            {t('pain.p6')}
          </p>
        )}

        <p className="text-[var(--vai-text-primary)] font-medium text-lg mt-4">
          {t('pain.p7')}
        </p>
      </div>
    </section>
  );
}
