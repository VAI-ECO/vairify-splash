export default function PaidSection() {
  const cards = [
    { icon: 'p-calcheck', title: 'Vairidate', desc: 'Book verified meetings in a few taps. VAI-checked at the door.' },
    { icon: 'p-card', title: 'VairiPay', desc: 'Secure P2P payments. No fees, no record.' },
    { icon: 'p-cal', title: 'Calendar', desc: 'Presets, buffers, and booking windows — set once.' },
    { icon: 'p-bolt', title: 'Vairify Now', desc: 'Toggle available and appear to nearby verified clients.' },
    { icon: 'p-mail', title: 'Invitations', desc: 'Broadcast what you want. Get matched in minutes.' },
    { icon: 'p-search', title: 'Directory', desc: 'Search and discover across the community.' },
    { icon: 'p-qr', title: 'QR & VAI Number', desc: 'One code links straight to your profile.' },
    { icon: 'p-feed', title: 'Social Feed', desc: 'Verified posts and updates from the community.' },
    { icon: 'p-chat', title: 'Encrypted Chat', desc: 'Private, secure messaging between verified members. No burner apps.' },
    { icon: 'p-vault', title: 'VAI Vault', desc: 'Secure storage for your V.A.I. and documents. Synced across every platform.' },
    { icon: 'p-hub', title: 'Social Hub', desc: 'Post once, share across every platform.' },
    { icon: 'p-rose', title: 'Golden Roses', desc: '200 Golden Roses every month, included.' },
  ];

  return (
    <>
      {/* Transition tease */}
      <div className="tease">
        <span className="arw">↓ Then, separately</span> — what convenience costs. <span className="amt">$29.99/mo.</span>
      </div>

      {/* Paid band */}
      <div className="paid-band">
        <div className="wrap">
          {/* Header stack */}
          <p className="paid-standard">
            <img src="/brand/vairify-icon-light-clear.svg" alt="Vairify" style={{ height: '56px', width: 'auto', verticalAlign: '-12px', marginRight: '10px' }} />
            is the standard.
          </p>
          <p className="paid-standline">
            The first standard in safety and protection. Free, always.
          </p>
          <p className="paid-standline">
            And the <span className="hl-new">NEW</span> standard in convenience.
          </p>
          <p className="paid-want">
            Our Premium Package is built for convenience — all the features that make life easier.<br />
            You don't need Premium to be safe. You choose Premium because it brings real value.
          </p>
          <div className="paid-price">
            $29.99<span>/month</span>
          </div>
          <p className="paid-leadin">This is what real convenience looks like.</p>

          {/* 12 cards grid */}
          <div className="paid-grid">
            {cards.map((card, index) => (
              <div className="pcard" key={index}>
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
