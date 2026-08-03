export default function DeclarationBridge() {
  return (
    <section>
      {/* Purple band - full bleed, no tabs */}
      <div style={{
        background: '#8B5CF6',
        padding: '28px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        {/* VAIRIFY logo - va-fl-14 (white background lockup) */}
        <img
          src="/logo/va-fl-14.png"
          alt="Vairify"
          style={{
            height: 'clamp(32px, 6vw, 62px)',
            width: 'auto'
          }}
        />

        {/* IS THE STANDARD text */}
        <span style={{
          fontSize: 'clamp(24px, 4.8vw, 46px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#FFFFFF'
        }}>
          IS THE STANDARD
        </span>
      </div>
    </section>
  );
}
