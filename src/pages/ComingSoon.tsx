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
        padding: '32px 24px 32px',
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
          {/* Logo and wordmark */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '12px'
          }}>
            <img
              src="/vairify-logo.svg"
              alt="Vairify"
              style={{
                height: 'clamp(88px, 12vw, 120px)',
                width: 'auto'
              }}
            />
            <div style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em'
            }}>
              Vairify.
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '14px'
          }}>
            Launching soon
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(38px,7vw,68px)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '18px',
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
            marginBottom: '14px',
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
            margin: '0 auto 12px'
          }}>
            The most advanced protection available today.<br />
            Onboard in <span style={{ color: '#8B5CF6' }}>minutes</span>. Applied in <span style={{ color: '#8B5CF6' }}>seconds</span>.<br />
            Giving everyone <span style={{ color: '#8B5CF6' }}>certainty</span> — before, during, and after.<br />
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
            That's why we made every safety feature <span style={{ color: '#00a884', fontSize: 'clamp(32px,5vw,44px)', fontWeight: 900 }}>FREE</span>.
          </p>

          {/* Three-part strip */}
          <div style={{
            maxWidth: '700px',
            margin: '0 auto 28px'
          }}>
            {/* Line 1: One V.A.I. / Every platform */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                fontSize: 'clamp(24px,3.5vw,32px)',
                fontWeight: 900,
                color: '#5170FF',
                marginBottom: '4px',
                lineHeight: 1.2
              }}>
                One V.A.I.
              </div>
              <div style={{
                fontSize: 'clamp(14px,2vw,18px)',
                fontWeight: 700,
                color: '#5170FF',
                marginBottom: '36px',
                lineHeight: 1.3
              }}>
                Every platform.
              </div>
              {/* Powered by label */}
              <div style={{
                fontSize: 'clamp(10px,1.3vw,12px)',
                fontWeight: 700,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '2px'
              }}>
                Powered by
              </div>
              {/* ChainPass lockup */}
              <img
                src="/chainpass-lockup.png"
                alt="ChainPass - Zero Knowledge Architecture"
                style={{
                  width: 'clamp(260px, 45vw, 360px)',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* Line 2: Shields and Premium side by side */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                textAlign: 'center'
              }}
              className="shields-premium-row"
            >
              <div>
                <div style={{
                  fontSize: 'clamp(24px,3.5vw,32px)',
                  fontWeight: 900,
                  color: '#8B5CF6',
                  marginBottom: '6px',
                  lineHeight: 1.2
                }}>
                  9 Shields of Protection
                </div>
                <div style={{
                  fontSize: 'clamp(14px,2vw,18px)',
                  color: '#94A3B8',
                  lineHeight: 1.3
                }}>
                  Free, for everyone
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 'clamp(24px,3.5vw,32px)',
                  fontWeight: 900,
                  color: '#8B5CF6',
                  marginBottom: '6px',
                  lineHeight: 1.2
                }}>
                  Premium convenience
                </div>
                <div style={{
                  fontSize: 'clamp(14px,2vw,18px)',
                  color: '#94A3B8',
                  lineHeight: 1.3
                }}>
                  When you want it — $29.99/mo
                </div>
              </div>
            </div>

            <style>{`
              @media (max-width: 640px) {
                .shields-premium-row {
                  grid-template-columns: 1fr !important;
                  gap: 20px !important;
                }
              }
            `}</style>
          </div>

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
            marginBottom: '20px'
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
              margin: '0 auto 16px',
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
              margin: '0 auto 16px',
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
            No spam. One email when we open. <span style={{ fontWeight: 700, color: '#B79BF6' }}>Verification and safety features are free forever</span> — that will never change.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px 24px',
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
