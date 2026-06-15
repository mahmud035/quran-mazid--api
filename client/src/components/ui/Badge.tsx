import type { ReactNode } from 'react';

type Tone = 'neutral' | 'meccan' | 'medinan' | 'primary';

const tones: Record<Tone, string> = {
  neutral: 'bg-stone-100 text-stone-600 dark:bg-slate-700 dark:text-slate-200',
  meccan: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  medinan: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  primary: 'bg-primary-soft text-primary dark:bg-primary/30 dark:text-emerald-200',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
