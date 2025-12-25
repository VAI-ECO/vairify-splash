import { useTranslation } from 'react-i18next';

export default function ShieldsEntry() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-[#f0f5ff] dark:bg-[#0d0d14] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-2xl text-gray-900 dark:text-white mb-6">
          {t('shieldsEntry.p1')}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {t('shieldsEntry.p2')}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          {t('shieldsEntry.p3')}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
          {t('shieldsEntry.p4')}
        </p>
        <p className="text-xl text-gray-900 dark:text-white font-bold mb-8">
          {t('shieldsEntry.p4b')}
        </p>

        <p className="text-xl text-gray-900 dark:text-white mb-8">
          {t('shieldsEntry.p5')}{' '}
          <span className="text-[#00d4aa] font-black">{t('shieldsEntry.p5b')}</span>
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          {t('shieldsEntry.p6')}
        </p>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          {t('shieldsEntry.p7')}
        </p>
        <p className="text-4xl md:text-5xl text-[#00d4aa] font-black mb-8">
          {t('shieldsEntry.p8')}
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          {t('shieldsEntry.p9')}
        </p>
        <p className="text-lg text-gray-900 dark:text-white">
          {t('shieldsEntry.p10')}
        </p>
      </div>
    </section>
  );
}
