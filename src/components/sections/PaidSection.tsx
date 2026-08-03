export default function PaidSection() {
  const cards = [
    { icon: 'p-calcheck', title: 'Vairidate', desc: 'Book verified meetings in a few taps. VAI-checked at the door.' },
    { icon: 'p-card', title: 'VairiPay', desc: 'Secure P2P payments. No fees, no record.' },
    { icon: 'p-cal', title: 'Calendar', desc: 'Presets, buffers, and booking windows — set once.' },
    { icon: 'p-bolt', title: 'Vairify Now', desc: 'Toggle available and appear to nearby verified clients.' },
    { icon: 'p-mail', title: 'Invitations', desc: 'Broadcast what you want. Get matched in minutes.' },
    { icon: 'p-search', title: 'Directory', desc: 'Search and discover across the community.' },
    { icon: 'p-qr', title: 'Custom QR Codes', desc: 'Your own QR code and VAI number, styled in your colors. Share it anywhere.' },
    { icon: 'p-feed', title: 'Social Feed', desc: 'Verified posts and updates from the community.' },
    { icon: 'p-chat', title: 'Encrypted Chat', desc: 'Private, secure messaging between verified members. No burner apps.' },
    { icon: 'p-vault', title: 'VAI Vault', desc: 'Secure storage for your V.A.I. and documents. Synced across every platform.' },
    { icon: 'p-hub', title: 'Social Hub', desc: 'Post once, share across every platform.' },
    { icon: 'p-rose', title: 'Golden Roses', desc: '200 Golden Roses every month, included.' },
    { icon: 'p-qr', title: 'Custom Badges', desc: 'A Vairify badge in your colors, with your VAI number. Put it on your site, your ads, anywhere.' },
    { icon: 'p-qr', title: 'Customizable Profile Pages', desc: 'Your colors, your layout, your page. Built for you.' },
    { icon: 'p-rose', title: 'Revenue Sharing', desc: 'Earn on every member you bring to Vairify.' },
  ];

  return (
    <>
      {/* Paid band */}
      <div className="paid-band">
        <div className="wrap">
          {/* Downward chevron - purple, bobs down */}
          <svg
            className="chevron-down"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: 'block',
              margin: '0 auto 14px',
              stroke: '#8B5CF6',
              strokeWidth: 4.5,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              animation: 'bob-dn 1.6s ease-in-out infinite'
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>

          {/* Declaration C: Optional divider */}
          <p style={{
            fontSize: 'clamp(11px,1.6vw,13px)',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#7C3AED',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            ↓ Everything below this line is optional.
          </p>

          {/* Declaration C: NEW standard */}
          <p style={{
            fontSize: 'clamp(16px,2.5vw,23px)',
            fontWeight: 800,
            letterSpacing: '-0.015em',
            color: '#1A1230',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            The <span style={{
              background: '#8B5CF6',
              color: '#FFFFFF',
              fontWeight: 900,
              borderRadius: '7px',
              padding: '1px 9px',
              display: 'inline-block'
            }}>NEW</span> standard — convenience.
          </p>

          {/* Keep only second sentence */}
          <p className="paid-want">
            You don't need Premium to be safe. You choose Premium because it brings real value.
          </p>
          <div className="paid-price">
            $29.99<span>/month</span>
          </div>
          <p className="paid-leadin">This is what real convenience looks like.</p>

          {/* 12 cards grid */}
          <div className="paid-grid">
            {cards.map((card, index) => (
              <div className="pcard" key={index} style={{ position: 'relative' }}>
                {/* Corner badge - top right */}
                <img
                  src="/logo/va-ic-02.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '24px',
                    height: '24px'
                  }}
                />
                <span className="pmark" aria-hidden="true"></span>
                <svg className="pico">
                  <use href={`#${card.icon}`} />
                </svg>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Paid capstone + community beat */}
          <div className="paid-close" style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: 'clamp(22px,3.6vw,36px)', fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.15, color: '#1A1230' }}>
              <img src="/brand/vairify-icon-light-clear.svg" alt="Vairify" style={{ height: '38px', width: 'auto', verticalAlign: '-8px', marginRight: '6px' }} />
              <span>The new standard of convenience.</span>
            </p>
          </div>
          <div style={{ textAlign: 'center', margin: '40px auto 0', maxWidth: '760px' }}>
            <p style={{ fontSize: 'clamp(20px,2.9vw,30px)', fontWeight: 800, color: '#1A1230', lineHeight: 1.2, letterSpacing: '-.01em' }}>
              The entire community. One app. <span style={{ color: '#7C3AED' }}>Optimized for you.</span>
            </p>
            <p style={{ fontSize: 'clamp(15px,1.9vw,19px)', color: '#5B4C7A', marginTop: '10px', lineHeight: 1.5 }}>
              Everything you need to work, connect, and stay in control.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
