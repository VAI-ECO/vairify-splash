import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

export default function MidCta() {
  const { t } = useTranslation();

  const scrollToForm = () => {
    const form = document.getElementById('reservation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="
      py-16 px-6
      vai-section-secondary
      border-y border-[var(--vai-border)]
    ">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="
          text-2xl md:text-3xl font-bold
          text-[var(--vai-text-primary)]
          mb-6
        ">
          {t('midCta.text')}
        </h2>

        <Button
          onClick={scrollToForm}
          size="lg"
          className="
            relative group
            shadow-lg hover:shadow-xl
            transform hover:scale-105 active:scale-100
            transition-all duration-200
            mb-4
          "
        >
          <span className="absolute inset-0 rounded-lg bg-[#00d4aa] opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300" />
          <span className="relative">{t('midCta.cta')}</span>
        </Button>

        <p className="
          mt-6
          text-[var(--vai-text-muted)]
          flex items-center justify-center gap-2
        ">
          {t('midCta.continue')}
          <ChevronDown className="w-4 h-4" />
        </p>
      </div>
    </section>
  );
}
