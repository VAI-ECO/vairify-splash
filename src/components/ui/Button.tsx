import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-[#00d4aa] hover:bg-[#00b892] text-black focus:ring-[#00d4aa] dark:focus:ring-offset-[#0a0a0f] focus:ring-offset-white transform hover:scale-105 active:scale-100',
      secondary: 'bg-[#4F7DF3] hover:bg-[#3D6AE0] text-white focus:ring-[#4F7DF3] dark:focus:ring-offset-[#0a0a0f] focus:ring-offset-white',
      ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-[#1a1a2e] text-gray-700 dark:text-gray-300 focus:ring-[#4F7DF3] dark:focus:ring-offset-[#0a0a0f] focus:ring-offset-white',
    };
    
    const sizes = {
      sm: 'text-sm py-2 px-4',
      md: 'text-base py-3 px-6',
      lg: 'text-lg py-4 px-10',
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
