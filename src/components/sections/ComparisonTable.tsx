import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';

interface RowConfig {
  key: string;
  highlight?: boolean;
}

const ROWS: RowConfig[] = [
  { key: 'guarantee', highlight: true },
  { key: 'time' },
  { key: 'verifyOnce' },
  { key: 'leoDisclosure' },
  { key: 'violentOffender' },
  { key: 'unfakeable' },
  { key: 'communityHistory' },
  { key: 'mutualConsent' },
  { key: 'identityExposure' },
  { key: 'preventScams' },
  { key: 'realtimeIntel' },
  { key: 'cost', highlight: true },
];

const VALUES: Record<string, [string, string, string, string]> = {
  guarantee: ['check', 'x', 'x', 'x'],
  time: ['seconds', 'hours', 'days', 'days'],
  verifyOnce: ['check', 'everyTime', 'everyTime', 'everyTime'],
  leoDisclosure: ['check', 'x', 'x', 'x'],
  violentOffender: ['check', 'x', 'some', 'x'],
  unfakeable: ['check', 'x', 'x', 'x'],
  communityHistory: ['check', 'x', 'x', 'check'],
  mutualConsent: ['check', 'x', 'x', 'x'],
  identityExposure: ['never', 'everyTime', 'everyTime', 'everyTime'],
  preventScams: ['check', 'x', 'x', 'x'],
  realtimeIntel: ['check', 'x', 'x', 'x'],
  cost: ['free', 'timeMoney', 'price', 'free'],
};

export default function ComparisonTable() {
  const { t } = useTranslation();

  const renderValue = (value: string, isVairify: boolean) => {
    if (value === 'check') {
      return <Check className="w-6 h-6 mx-auto text-[#00a884] stroke-[3]" />;
    }
    if (value === 'x') {
      return <X className="w-6 h-6 mx-auto text-red-500 stroke-[3]" />;
    }

    const translatedValue = t(`comparison.values.${value}`, value);

    // Special styling for Vairify column highlights
    const isHighlightValue = isVairify && (
      value === 'free' ||
      value === 'seconds' ||
      value === 'never'
    );

    return (
      <span className={
        isVairify
          ? `font-medium ${
              isHighlightValue
                ? 'text-[#00a884] font-bold'
                : 'text-[var(--vai-text-primary)]'
            }`
          : 'text-[var(--vai-text-secondary)] font-medium'
      }>
        {translatedValue}
      </span>
    );
  };

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-[var(--vai-text-primary)]">Hope </span>
            <span className="text-[var(--vai-text-muted)]">vs. </span>
            <span className="text-[#00d4aa]">Protection</span>
          </h2>
          <p className="text-[var(--vai-text-secondary)] mt-2">
            {t('comparison.subtitle')}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header Row */}
            <thead>
              <tr className="bg-[#1a1a5e] text-white">
                <th className="py-4 px-4 text-left font-bold"></th>
                <th className="py-4 px-4 text-center">
                  <span className="text-[#00d4aa] font-bold">{t('comparison.vairify')}</span>
                </th>
                <th className="py-4 px-4 text-center font-medium">{t('comparison.social')}</th>
                <th className="py-4 px-4 text-center font-medium">{t('comparison.services')}</th>
                <th className="py-4 px-4 text-center font-medium">{t('comparison.refs')}</th>
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, index) => {
                const values = VALUES[row.key];
                const isCostRow = row.key === 'cost';
                return (
                  <tr
                    key={row.key}
                    className={`
                      border-b border-[var(--vai-border)]
                      ${isCostRow
                        ? 'bg-[#2dd4bf]/10 border-t-2 border-t-[#2dd4bf]'
                        : index % 2 === 0
                          ? 'bg-white dark:bg-[#1a1a2e]'
                          : 'bg-[#f0f5ff] dark:bg-[#12121a]'
                      }
                    `}
                  >
                    {/* Feature name */}
                    <td className={`px-4 text-[var(--vai-text-primary)] ${isCostRow ? 'py-6 text-2xl font-bold' : 'py-4 font-medium'}`}>
                      {t(`comparison.rows.${row.key}`)}
                    </td>

                    {/* Vairify column - highlighted */}
                    <td className={`
                      px-4 text-center
                      ${isCostRow ? 'py-6 bg-[#2dd4bf]/10' : 'py-4 bg-[#00d4aa]/5 dark:bg-[#00d4aa]/10'}
                    `}>
                      <span className={isCostRow ? 'text-2xl font-extrabold text-[#2dd4bf]' : ''}>
                        {renderValue(values[0], true)}
                      </span>
                    </td>

                    {/* Other columns */}
                    {values.slice(1).map((value, j) => (
                      <td key={j} className={`px-4 text-center ${isCostRow ? 'py-6' : 'py-4'}`}>
                        <span className={isCostRow ? 'text-2xl font-bold' : ''}>
                          {renderValue(value, false)}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
