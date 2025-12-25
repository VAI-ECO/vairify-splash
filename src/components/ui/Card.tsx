import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'highlighted';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderColor?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', borderColor, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl border transition-all duration-200';
    
    const variants = {
      default: 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-[#2a2a4e]',
      hover: 'bg-white dark:bg-[#1a1a2e] border-gray-200 dark:border-[#2a2a4e] hover:border-[#4F7DF3]/50 cursor-pointer',
      highlighted: 'bg-white dark:bg-[#1a1a2e] border-[#00d4aa] shadow-lg shadow-[#00d4aa]/20',
    };
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };
    
    const borderStyle = borderColor ? { borderColor } : {};
    
    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        style={borderStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
