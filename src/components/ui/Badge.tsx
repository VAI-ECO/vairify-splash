interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 dark:bg-[#2a2a4e] text-gray-700 dark:text-gray-300',
    success: 'bg-[#00d4aa]/10 text-[#00d4aa]',
    warning: 'bg-[#ffd700]/10 text-[#ffd700]',
    error: 'bg-red-500/10 text-red-500',
    info: 'bg-[#3B82F6]/10 text-[#3B82F6]',
  };
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
