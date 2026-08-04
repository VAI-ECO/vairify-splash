export default function DeclarationBridge() {
  return (
    <section className="declaration-bridge">
      {/* DARK SECTION ABOVE - boundary caption */}
      <div style={{
        background: '#020617',
        padding: '24px 20px 40px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.01em'
        }}>
          Everything above this line is <span style={{
            color: '#00a884',
            textTransform: 'uppercase'
          }}>free</span>
        </p>
      </div>

      {/* UPPER CHEVRON - lavender, widens toward band, apex points up */}
      <div style={{
        position: 'relative',
        background: '#C4B5FD',
        height: 'clamp(120px, 18vw, 240px)',
        clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Text in upper chevron */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          textAlign: 'center',
          color: '#0F172A'
        }}>
          <span style={{
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>The</span>
          <span style={{
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 0.9
          }}>FIRST</span>
          <span style={{
            fontSize: 'clamp(16px, 2.2vw, 28px)',
            fontWeight: 700,
            letterSpacing: '-0.01em'
          }}>Standard in Safety</span>
        </div>
      </div>

      {/* THE BAND - purple, flat */}
      <div style={{
        background: '#8B5CF6',
        height: 'clamp(90px, 12vw, 150px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        flexWrap: 'wrap'
      }}>
        {/* VAIRIFY all-white lockup */}
        <img
          src="/assets/vairify-logo-light.svg"
          alt="Vairify"
          style={{
            height: 'clamp(36px, 5vw, 64px)',
            width: 'auto'
          }}
        />

        {/* Band text */}
        <span style={{
          fontSize: 'clamp(28px, 4.5vw, 52px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          lineHeight: 1
        }}>
          is the new standard
        </span>
      </div>

      {/* LOWER CHEVRON - dark, widens toward band, apex points down */}
      <div style={{
        position: 'relative',
        background: '#0F172A',
        height: 'clamp(120px, 18vw, 240px)',
        clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Text in lower chevron */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          textAlign: 'center',
          color: '#FFFFFF'
        }}>
          <span style={{
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 600,
            letterSpacing: '-0.01em'
          }}>The</span>
          <span style={{
            fontSize: 'clamp(32px, 5vw, 58px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 0.9
          }}>NEW</span>
          <span style={{
            fontSize: 'clamp(16px, 2.2vw, 28px)',
            fontWeight: 700,
            letterSpacing: '-0.01em'
          }}>Standard in Convenience</span>
        </div>
      </div>

      {/* LAVENDER SECTION BELOW - boundary caption */}
      <div style={{
        background: '#C4B5FD',
        padding: '40px 20px 24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          fontWeight: 700,
          color: '#0F172A',
          letterSpacing: '-0.01em'
        }}>
          Everything below this line is optional
        </p>
      </div>

      {/* Mobile responsive adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .declaration-bridge div[style*="clipPath"] {
            height: 100px !important;
          }

          .declaration-bridge div[style*="clipPath"] > div {
            flex-direction: column;
            gap: 4px !important;
          }

          .declaration-bridge div[style*="clipPath"] > div > span:nth-child(2) {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
