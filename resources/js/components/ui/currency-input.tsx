import * as React from 'react';
import { Input } from '@/components/ui/input';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: number;
    onChange: (value: number) => void;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value, onChange, className, ...props }, ref) => {
        const [displayValue, setDisplayValue] = React.useState('');

        // Format number to display with thousand separators
        const formatNumber = (num: number): string => {
            if (num === 0) return '';
            return new Intl.NumberFormat('id-ID').format(num);
        };

        // Update display value when prop value changes
        React.useEffect(() => {
            setDisplayValue(formatNumber(value));
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            
            // Allow only numbers and dots/commas
            const cleaned = inputValue.replace(/\D/g, '');
            
            if (cleaned === '') {
                setDisplayValue('');
                onChange(0);
                return;
            }

            const numericValue = parseInt(cleaned, 10);
            setDisplayValue(formatNumber(numericValue));
            onChange(numericValue);
        };

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            e.target.select();
        };

        return (
            <Input
                ref={ref}
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                className={className}
                {...props}
            />
        );
    }
);

CurrencyInput.displayName = 'CurrencyInput';
