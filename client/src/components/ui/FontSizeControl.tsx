import type { FontSize } from '@/types/api';
import { FONT_SIZES } from '@/utils/constants';

interface FontSizeControlProps {
  value: FontSize;
  onChange: (size: FontSize) => void;
}

const buttonTextSize: Record<FontSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

/** Four "A" buttons of increasing size; the active one is highlighted. */
export function FontSizeControl({ value, onChange }: FontSizeControlProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-stone-200 p-1 dark:border-slate-700">
      {FONT_SIZES.map(({ value: size }) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          aria-label={`Font size ${size}`}
          aria-pressed={value === size}
          className={`flex h-8 w-8 items-center justify-center rounded font-arabic ${buttonTextSize[size]} ${
            value === size
              ? 'bg-primary text-white'
              : 'text-stone-500 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          A
        </button>
      ))}
    </div>
  );
}
