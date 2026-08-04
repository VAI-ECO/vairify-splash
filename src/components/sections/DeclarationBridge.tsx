export default function DeclarationBridge() {
  return (
    <section className="declaration-bridge">
      {/* DARK SECTION with bordered FREE plate */}
      <div style={{
        background: '#020617',
        padding: '40px 20px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.05)'
        }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '0.02em',
            margin: 0
          }}>
            Everything above this line is <span style={{
              color: '#00a884',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>FREE</span>
          </p>
        </div>
      </div>

      {/* UPPER WEDGE - points DOWN (dark section's bottom edge) */}
      <div style={{
        position: 'relative',
        background: '#020617',
        height: '32px',
        clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)'
      }} />

      {/* UPPER CAPTION on lavender */}
      <div style={{
        background: '#C4B5FD',
        padding: '16px 20px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '18px',
          fontWeight: 500,
          color: '#0F172A',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <span>The</span>
          <span style={{
            display: 'inline-block',
            background: '#8B5CF6',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '18px'
          }}>FIRST</span>
          <span>Standard in Safety</span>
        </p>
      </div>

      {/* THE BAND - purple, with large logo */}
      <div style={{
        background: '#8B5CF6',
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* VAIRIFY all-white lockup - large */}
        <img
          src="/logo/va-fl-14.png"
          alt="Vairify"
          style={{
            height: '52px',
            width: 'auto'
          }}
        />

        {/* Band text - matched cap height */}
        <span style={{
          fontSize: '52px',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          lineHeight: 1
        }}>
          is the new standard
        </span>
      </div>

      {/* LOWER CAPTION on dark */}
      <div style={{
        background: '#0F172A',
        padding: '16px 20px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '18px',
          fontWeight: 500,
          color: '#FFFFFF',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <span>The</span>
          <span style={{
            display: 'inline-block',
            background: '#8B5CF6',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '18px'
          }}>NEW</span>
          <span>Standard in Convenience</span>
        </p>
      </div>

      {/* LOWER WEDGE - points DOWN */}
      <div style={{
        position: 'relative',
        background: '#0F172A',
        height: '32px',
        clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)'
      }} />

      {/* OPTIONAL LINE on lavender - small purple caps with arrow */}
      <div style={{
        background: '#C4B5FD',
        padding: '32px 20px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#8B5CF6',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span>↓</span>
          <span>Everything below this line is optional</span>
        </p>
      </div>
    </section>
  );
}
