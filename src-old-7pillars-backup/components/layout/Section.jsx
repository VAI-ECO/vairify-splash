export function Section({ children, className = '', id, dark = false }) {
  return (
    <section
      id={id}
      className={`py-20 px-6 ${dark ? 'bg-background' : 'bg-card'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
