import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

interface GovernancePreviewProps {
  onContinue: () => void;
  onSwitchToFC: () => void;
}

export default function GovernancePreview({ onContinue, onSwitchToFC }: GovernancePreviewProps) {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--vai-text-primary)] mb-4">
            {t('governance.preview.title')}
          </h2>
          <p className="text-lg text-[var(--vai-text-secondary)]">
            {t('governance.preview.subtitle')}
          </p>
        </div>

        {/* Preview Questions (Read-only) */}
        <div className="space-y-8 mb-12">
          {/* Question 1 Preview */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a1a2e] dark:to-[#12121a] rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md opacity-75">
            <h3 className="text-lg font-bold text-[var(--vai-text-primary)] mb-4">
              {t('governance.q1.question')}
            </h3>
            <div className="space-y-3 text-[var(--vai-text-secondary)]">
              <p>○ {t('governance.q1.options.yes')}</p>
              <p>○ {t('governance.q1.options.no')}</p>
            </div>
          </div>

          {/* Question 2 Preview */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a1a2e] dark:to-[#12121a] rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md opacity-75">
            <h3 className="text-lg font-bold text-[var(--vai-text-primary)] mb-4">
              {t('governance.q2.question')}
            </h3>
            <div className="space-y-3 text-[var(--vai-text-secondary)]">
              <p>○ {t('governance.q2.options.a')}</p>
              <p>○ {t('governance.q2.options.b')}</p>
              <p>○ {t('governance.q2.options.c')}</p>
            </div>
          </div>

          {/* Question 3 Preview */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a1a2e] dark:to-[#12121a] rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md opacity-75">
            <h3 className="text-lg font-bold text-[var(--vai-text-primary)] mb-4">
              {t('governance.q3.question')}
            </h3>
            <div className="space-y-3 text-[var(--vai-text-secondary)]">
              <p>○ {t('governance.q3.options.a')}</p>
              <p>○ {t('governance.q3.options.b')}</p>
            </div>
          </div>
        </div>

        {/* FOMO Switch to FC */}
        <div className="p-6 bg-gradient-to-r from-[#ffd700]/10 to-[#ffa500]/10 dark:from-[#ffd700]/20 dark:to-[#ffa500]/20 rounded-xl border-2 border-[#ffd700]/30 mb-8 text-center">
          <p className="text-lg font-bold text-[var(--vai-text-primary)] mb-3">
            {t('governance.preview.fomo')}
          </p>
          <button
            onClick={onSwitchToFC}
            className="text-[#ffd700] hover:text-[#ffa500] font-bold text-lg transition-colors underline"
          >
            {t('governance.preview.switchLink')}
          </button>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="!px-12"
          >
            {t('governance.preview.continue')}
          </Button>
        </div>
      </div>
    </section>
  );
}
