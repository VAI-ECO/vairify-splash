import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="flex items-start gap-3 cursor-pointer group"
        >
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              className={`
                peer sr-only
                ${className}
              `}
              {...props}
            />
            <div className="
              w-5 h-5 rounded border-2 transition-all duration-200
              border-gray-300 dark:border-[#2a2a4e]
              bg-white dark:bg-[#1a1a2e]
              peer-checked:bg-[#00d4aa] peer-checked:border-[#00d4aa]
              peer-focus:ring-2 peer-focus:ring-[#4F7DF3] peer-focus:ring-offset-2
              dark:peer-focus:ring-offset-[#0a0a0f]
              group-hover:border-[#4F7DF3]
            ">
              <svg
                className="w-full h-full text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 leading-tight">
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500 ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
