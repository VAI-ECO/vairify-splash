import { InputHTMLAttributes, forwardRef } from 'react';

interface RadioOption {
  value: string;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, error, className = '' }: RadioGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          sublabel={option.sublabel}
          checked={value === option.value}
          disabled={option.disabled}
          onChange={() => onChange?.(option.value)}
        />
      ))}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  sublabel?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', label, sublabel, ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="radio"
            className={`peer sr-only ${className}`}
            {...props}
          />
          <div className="
            w-5 h-5 rounded-full border-2 transition-all duration-200
            border-gray-300 dark:border-[#2a2a4e]
            bg-white dark:bg-[#1a1a2e]
            peer-checked:border-[#00d4aa]
            peer-focus:ring-2 peer-focus:ring-[#4F7DF3] peer-focus:ring-offset-2
            dark:peer-focus:ring-offset-[#0a0a0f]
            group-hover:border-[#4F7DF3]
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
          ">
            <div className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-2.5 h-2.5 rounded-full bg-[#00d4aa]
              opacity-0 peer-checked:opacity-100 transition-opacity duration-200
            " />
          </div>
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </span>
          {sublabel && (
            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
