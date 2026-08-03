import { useTranslation } from 'react-i18next';

export default function ShieldsEntry() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-[#f0f5ff] dark:bg-[#0d0d14] border-t border-gray-200 dark:border-gray-800">
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        {/* Opening */}
        <p style={{
          fontSize: 'clamp(28px, 4.6vw, 46px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginBottom: '22px'
        }}>
          {t('shieldsEntry.p1')}
        </p>

        {/* Body line 1 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p2')}
        </p>

        {/* Body line 2 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p3')}
        </p>

        {/* Emphasis line 1 - with green highlight */}
        <p style={{
          fontSize: 'clamp(24px, 3.9vw, 38px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          We built the <span style={{ color: '#00a884' }}>most advanced safety platform</span> this industry has ever seen.
        </p>

        {/* Body line 3 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p4b')}
        </p>

        {/* Emphasis line 2 - all green */}
        <p style={{
          fontSize: 'clamp(24px, 3.9vw, 38px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#00a884',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p5')}
        </p>

        {/* Body line 4 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p6')}
        </p>

        {/* Body line 5 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p7')}
        </p>

        {/* FREE - special punch line with larger size */}
        <p style={{
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#00d4aa',
          marginTop: '20px'
        }}>
          {t('shieldsEntry.p8')}
        </p>

        {/* Body line 6 - combined p9 and p10 */}
        <p style={{
          fontSize: 'clamp(22px, 3.5vw, 34px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          {t('shieldsEntry.p9')} {t('shieldsEntry.p10')}
        </p>
      </div>
    </section>
  );
}
