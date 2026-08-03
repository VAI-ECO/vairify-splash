export default function FreeCapstone() {
  return (
    <div className="capstone" style={{ paddingBottom: '26px' }}>
      <div className="free" style={{ color: '#00a884' }}>
        FREE<span className="pd">.</span>
      </div>
      <p style={{ fontSize: 'clamp(20px,2.7vw,26px)', fontWeight: 800, color: '#FFFFFF', marginTop: '24px', lineHeight: 1.3 }}>
        Anonymity. Accountability.
      </p>
      <p style={{ fontSize: 'clamp(20px,2.7vw,26px)', fontWeight: 800, color: '#FFFFFF', marginTop: '8px', lineHeight: 1.3 }}>
        The most advanced protection available today.
      </p>
      <p style={{ fontSize: 'clamp(20px,2.7vw,26px)', fontWeight: 800, color: '#FFFFFF', marginTop: '14px', lineHeight: 1.3 }}>
        Onboard in minutes. Applied in seconds.
      </p>
      <p style={{ fontSize: 'clamp(20px,2.7vw,26px)', fontWeight: 800, color: '#FFFFFF', marginTop: '14px', lineHeight: 1.3 }}>
        Giving everyone certainty — <span style={{ color: 'var(--vf)' }}>before</span>, <span style={{ color: 'var(--vf)' }}>during</span>, and <span style={{ color: 'var(--vf)' }}>after</span>.
      </p>
      <div style={{ height: '1px', background: 'rgba(139,92,246,.22)', maxWidth: '190px', margin: '30px auto' }}></div>
      <p style={{ fontSize: 'clamp(20px,2.7vw,26px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3 }}>
        The only reason to risk your freedom, reputation, or your life is cost.
      </p>
      <p style={{ fontSize: 'clamp(28px,5vw,46px)', fontWeight: 900, letterSpacing: '-.02em', marginTop: '8px', lineHeight: 1.1 }}>
        That's why we made every safety feature <span style={{ color: 'var(--vf)' }}>free</span>.
      </p>
      <div style={{ height: '1px', background: 'rgba(139,92,246,.22)', maxWidth: '190px', margin: '28px auto' }}></div>

      {/* Declaration A: FIRST standard */}
      <p style={{
        fontSize: 'clamp(16px,2.5vw,23px)',
        fontWeight: 800,
        letterSpacing: '-0.015em',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: '32px'
      }}>
        The <span style={{
          background: '#00a884',
          color: '#0A0A0F',
          fontWeight: 900,
          borderRadius: '7px',
          padding: '1px 9px',
          display: 'inline-block'
        }}>FIRST</span> standard — safety and protection.
      </p>

      {/* Divider label */}
      <p style={{
        fontSize: 'clamp(11px,1.6vw,13px)',
        fontWeight: 800,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#00a884',
        textAlign: 'center',
        marginTop: '18px'
      }}>
        ↑ Everything above this line is free. Forever.
      </p>

      {/* Upward chevron - white, bobs up */}
      <svg
        className="chevron-up"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          margin: '14px auto 0',
          stroke: '#FFFFFF',
          strokeWidth: 4.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          animation: 'bob-up 1.6s ease-in-out infinite'
        }}
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  );
}
