export function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      className={`bg-card rounded-lg p-6 border border-cardBorder shadow-lg ${
        hover ? 'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
