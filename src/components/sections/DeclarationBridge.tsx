export default function DeclarationBridge() {
  return (
    <section className="declaration-bridge" style={{
      background: '#C4B5FD' // Lavender page background
    }}>
      {/* DARK BLOCK 1 - contains FREE plate, bottom edge clipped to point */}
      <div style={{
        position: 'relative',
        background: '#020617',
        padding: '40px 20px 60px',
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)'
      }}>
        {/* FREE plate */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
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

        {/* FIRST caption in taper area */}
        <div style={{
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
            }}>FIRST</span>
            <span>Standard in Safety</span>
          </p>
        </div>
      </div>

      {/* PURPLE BAND - flat, no clip */}
      <div style={{
        background: '#8B5CF6',
        padding: '32px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* VAIRIFY all-white lockup - NO pill, direct on purple */}
        <img
          src="/logo/va-fl-14.png"
          alt="Vairify"
          style={{
            height: '60px',
            width: 'auto'
          }}
        />

        {/* Band text */}
        <span style={{
          fontSize: '60px',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          lineHeight: 1
        }}>
          is the new standard
        </span>
      </div>

      {/* DARK BLOCK 2 - top edge clipped to point */}
      <div style={{
        position: 'relative',
        background: '#0F172A',
        padding: '60px 20px 40px',
        clipPath: 'polygon(0 0, 50% 30%, 100% 0, 100% 100%, 0 100%)'
      }}>
        {/* NEW caption in taper area */}
        <div style={{
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
      </div>

      {/* LIGHT SECTION - optional line */}
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
