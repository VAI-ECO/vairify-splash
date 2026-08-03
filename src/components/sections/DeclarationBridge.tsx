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
        {/* VAIRIFY logo - white variant for purple background */}
        <img
          src="/brand/vairify-logo-white-variant.svg"
          alt="Vairify"
          style={{
            height: 'clamp(32px, 6vw, 62px)',
            width: 'auto'
          }}
          onError={(e) => {
            // Fallback if white variant doesn't exist yet
            console.warn('White variant logo not found at /brand/vairify-logo-white-variant.svg');
            e.currentTarget.style.display = 'none';
            const placeholder = document.getElementById('logo-placeholder');
            if (placeholder) placeholder.style.display = 'inline-block';
          }}
        />

        {/* Placeholder if white variant not available */}
        <span
          id="logo-placeholder"
          style={{
            display: 'none',
            fontSize: 'clamp(24px, 4.8vw, 46px)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.03em'
          }}
        >
          [WHITE LOGO VARIANT NEEDED]
        </span>

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
