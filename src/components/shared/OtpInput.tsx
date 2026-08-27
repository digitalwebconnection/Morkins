import React, { useRef, useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  isError?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  isError = false,
  autoFocus = true,
  className = '',
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const sanitized = rawVal.replace(/\D/g, '');

    if (!sanitized) {
      // Cleared current box
      const nextDigits = [...digits];
      nextDigits[index] = '';
      onChange(nextDigits.join(''));
      return;
    }

    if (sanitized.length === 1) {
      const nextDigits = [...digits];
      nextDigits[index] = sanitized;
      const nextOtp = nextDigits.join('');
      onChange(nextOtp);

      // Auto advance to next box
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Multi-character input (e.g. autofill)
      handlePasteString(sanitized);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0 && inputRefs.current[index - 1]) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
        const nextDigits = [...digits];
        nextDigits[index - 1] = '';
        onChange(nextDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePasteString = (pastedText: string) => {
    const numbersOnly = pastedText.replace(/\D/g, '').slice(0, length);
    if (!numbersOnly) return;

    onChange(numbersOnly);
    const targetIdx = Math.min(numbersOnly.length, length - 1);
    if (inputRefs.current[targetIdx]) {
      inputRefs.current[targetIdx]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    handlePasteString(pasted);
  };

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-xl border transition-all outline-none select-none ${
            isError
              ? 'border-rose-500 bg-rose-50/50 text-rose-900 focus:ring-2 focus:ring-rose-500/20'
              : digits[i]
              ? 'border-[#13442C] bg-[#F0F6F2] text-[#13442C] shadow-2xs'
              : 'border-stone-200 bg-white text-[#162820] hover:border-stone-300'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed bg-stone-100' : 'focus:border-[#13442C] focus:ring-2 focus:ring-[#13442C]/15'
          }`}
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  );
}
