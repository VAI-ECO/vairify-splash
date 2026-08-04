import { useTranslation } from 'react-i18next';

export default function Pain() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 vai-section-secondary border-y border-[var(--vai-border)]">
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
          {t('pain.p1')}
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
          They all take <span style={{ color: '#ef4444' }}>TIME</span>. Cost <span style={{ color: '#ef4444' }}>MONEY</span>. And we convince ourselves they work.
        </p>

        {/* Emphasis line 1 */}
        <p style={{
          fontSize: 'clamp(24px, 3.9vw, 38px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#ef4444',
          marginTop: '12px'
        }}>
          {t('pain.p3')}
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
          {t('pain.p4')}
        </p>

        {/* Emphasis line 2 */}
        <p style={{
          fontSize: 'clamp(24px, 3.9vw, 38px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '12px'
        }}>
          Your <span style={{ color: '#ef4444' }}>safety</span>. Your <span style={{ color: '#ef4444' }}>money</span>. Your <span style={{ color: '#ef4444' }}>reputation</span>. Your <span style={{ color: '#ef4444' }}>freedom</span>. Even your <span style={{ color: '#ef4444' }}>life</span>.
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
          {t('pain.p5b')}
        </p>

        {/* Punch line 1 */}
        <p style={{
          fontSize: 'clamp(28px, 4.6vw, 44px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#ef4444',
          marginTop: '20px'
        }}>
          {t('pain.p6')}
        </p>

        {/* Punch line 2 */}
        <p style={{
          fontSize: 'clamp(28px, 4.6vw, 44px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          lineHeight: 1.12,
          color: '#FFFFFF',
          marginTop: '20px'
        }}>
          {t('pain.p7')}
        </p>
      </div>
    </section>
  );
}
