import { useState } from 'react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to signups table with RLS check
    console.log('Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020617',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Hero */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at top center, #14203D 0%, #0B1120 45%, #020617 100%)',
        padding: '80px 24px 60px',
        position: 'relative'
      }}>
        {/* Purple glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'rgba(139,92,246,.22)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0
        }}></div>

        <div style={{
          maxWidth: '680px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo */}
          <div style={{
            fontSize: 'clamp(28px,4.5vw,42px)',
            fontWeight: 900,
            color: '#8B5CF6',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Vairify<span style={{ color: '#3B82F6' }}>.</span>
          </div>

          {/* Eyebrow */}
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '24px'
          }}>
            Launching soon
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(38px,7vw,68px)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '32px',
            letterSpacing: '-0.02em'
          }}>
            The standard is<br />
            <span style={{ color: '#8B5CF6' }}>almost here.</span>
          </h1>

          {/* Lead line */}
          <p style={{
            fontSize: 'clamp(20px,3vw,28px)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '24px',
            lineHeight: 1.3
          }}>
            Anonymity. Accountability.
          </p>

          {/* Body */}
          <div style={{
            fontSize: 'clamp(18px,2.5vw,22px)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.5,
            maxWidth: '640px',
            margin: '0 auto 24px'
          }}>
            The most advanced protection available today.<br />
            Onboard in minutes. Applied in seconds.<br />
            Giving everyone certainty — before, during, and after.<br />
            The only reason to risk your freedom, reputation, or your life is cost.
          </div>

          {/* Free line */}
          <p style={{
            fontSize: 'clamp(24px,3.5vw,32px)',
            fontWeight: 900,
            color: '#FFFFFF',
            marginBottom: '28px',
            lineHeight: 1.2
          }}>
            That's why we made it <span style={{ color: '#00a884' }}>free</span>.
          </p>

          {/* Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#0C1730',
            border: '1px solid #8B5CF6',
            borderRadius: '999px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 700,
            color: '#CDBBFA',
            marginBottom: '32px'
          }}>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Sign up to get notified</span>
            <span style={{ margin: '0 6px' }}>—</span>
            be first to know.
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '440px',
              margin: '0 auto 20px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: '1 1 240px',
                  minWidth: '200px',
                  padding: '14px 18px',
                  background: '#0A1122',
                  border: '1px solid #24304C',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
                onBlur={(e) => e.target.style.borderColor = '#24304C'}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 32px',
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Notify me
              </button>
            </form>
          ) : (
            <div style={{
              padding: '20px',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid #8B5CF6',
              borderRadius: '12px',
              maxWidth: '440px',
              margin: '0 auto 20px',
              color: '#B79BF6',
              fontSize: '15px',
              fontWeight: 600
            }}>
              ✓ You're on the list. We'll notify you when we launch.
            </div>
          )}

          {/* Reassure line */}
          <p style={{
            fontSize: '13px',
            color: '#7C879E',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            No spam. One email when we open. <span style={{ fontWeight: 700, color: '#B79BF6' }}>Safety features are free forever</span> — that will never change.
          </p>
        </div>
      </main>

      {/* Strip */}
      <section style={{
        background: '#0F172A',
        borderTop: '1px solid #131C31',
        padding: '40px 24px'
      }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#B79BF6', marginBottom: '8px' }}>
              9 Shields of Protection
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              Free, for everyone
            </div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#8FB8F5', marginBottom: '8px' }}>
              One V.A.I. Every platform.
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              Powered by ChainPass
            </div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#B79BF6', marginBottom: '8px' }}>
              Premium convenience
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              When you want it — $29.99/mo
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 24px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#4B5872',
        lineHeight: 1.7
      }}>
        <p>
          <span style={{ fontWeight: 700, color: '#7C879E' }}>Patent pending.</span>
        </p>
        <p style={{ marginTop: '8px' }}>
          Vairify — safety and identity for the adult services community.
        </p>
      </footer>
    </div>
  );
}
