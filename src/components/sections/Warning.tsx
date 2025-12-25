import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

export default function Warning() {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-6 vai-section-primary">
      <div className="
        max-w-2xl mx-auto p-6
        bg-amber-50 dark:bg-amber-900/20
        border-2 border-amber-400 dark:border-amber-500
        rounded-xl
      ">
        <div className="flex items-start gap-4">
          <div className="
            w-10 h-10
            bg-amber-400 dark:bg-amber-500
            rounded-full
            flex items-center justify-center
            flex-shrink-0
          ">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>

          <div>
            <h4 className="
              text-lg font-bold
              text-amber-800 dark:text-amber-300
              mb-2
            ">
              {t('warning.title')}
            </h4>
            <p className="text-amber-700 dark:text-amber-200 mb-2">
              {t('warning.p1')}
            </p>
            <p className="text-amber-700 dark:text-amber-200 mb-2">
              {t('warning.p2')}
            </p>
            <p className="text-amber-800 dark:text-amber-100 font-bold">
              {t('warning.p3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
