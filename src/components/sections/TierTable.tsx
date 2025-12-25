import { useTranslation } from 'react-i18next';
import { Check, X } from 'lucide-react';

const ROW_KEYS = [
  'spots',
  'vairify',
  'premium',
  'vaiCoupon',
  'ceoCalls',
  'premiumVote',
  'policyVote',
  'finalVote',
  'leadership',
  'legalFund',
  'badge',
];

export default function TierTable() {
  const { t } = useTranslation();

  const renderCell = (value: string) => {
    if (value === '✓') {
      return <Check className="w-6 h-6 mx-auto text-[#00a884] stroke-[3]" />;
    }
    if (value === '✗') {
      return <X className="w-6 h-6 mx-auto text-red-500 stroke-[3]" />;
    }
    if (value.includes('FREE')) {
      return <span className="text-[#00d4aa] font-semibold">{value}</span>;
    }
    return value;
  };

  return (
    <section className="py-16 px-6 bg-[#f0f5ff] dark:bg-[#0d0d14]">
      <div className="max-w-5xl mx-auto">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm bg-white dark:bg-[#1a1a2e] shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#1a1a5e] border-b border-gray-200 dark:border-[#2a2a4e]">
                <th className="text-left py-6 px-4 text-white font-normal text-base">
                  {t('tierTable.headers.benefit')}
                </th>
                <th className="py-6 px-4 text-[#FFD700] font-bold text-center text-base">
                  {t('tierTable.headers.fc')}
                </th>
                <th className="py-6 px-4 text-[#C0C0C0] font-bold text-center text-base">
                  {t('tierTable.headers.fm')}
                </th>
                <th className="py-6 px-4 text-[#00d4aa] font-bold text-center text-base">
                  {t('tierTable.headers.ea')}
                </th>
                <th className="py-6 px-4 text-gray-300 font-normal text-center text-base">
                  {t('tierTable.headers.public')}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROW_KEYS.map((rowKey, i) => (
                <tr
                  key={rowKey}
                  className={`
                    border-b border-gray-100 dark:border-[#2a2a4e]/50
                    ${i % 2 === 0 ? 'bg-[#f0f5ff]' : 'bg-white'} dark:bg-[#1a1a2e]
                    ${i === 0 || rowKey === 'premium' || rowKey === 'vaiCoupon' ? '!bg-[#00d4aa]/10' : ''}
                  `}
                >
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">
                    {t(`tierTable.rows.${rowKey}.label`)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderCell(t(`tierTable.rows.${rowKey}.fc`))}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderCell(t(`tierTable.rows.${rowKey}.fm`))}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderCell(t(`tierTable.rows.${rowKey}.ea`))}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">
                    {renderCell(t(`tierTable.rows.${rowKey}.public`))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 space-y-2 text-sm text-gray-400">
          <p>* Vairify covers part or all of your ChainPass V.A.I. fee as a signup bonus. Your coupon code will be emailed to you for use at ChainPass V.A.I. upon completing your official registration.</p>
          <p>** "Free" does not begin until the last scheduled premium feature has shipped.</p>
        </div>
      </div>
    </section>
  );
}
