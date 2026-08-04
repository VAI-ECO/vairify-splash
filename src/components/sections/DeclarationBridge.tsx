export default function DeclarationBridge() {
  return (
    <section className="bridge" style={{ background: '#EDE9FE' }}>
      <div className="bridge-top" style={{
        background: '#0a0a0f',
        height: '120px',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)'
      }} />
      <div className="bridge-band" style={{
        background: '#8B5CF6',
        height: '80px'
      }} />
      <div className="bridge-bottom" style={{
        background: '#0a0a0f',
        height: '120px',
        clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)'
      }} />
    </section>
  );
}
