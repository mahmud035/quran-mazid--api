import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon = Inbox, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Icon className="h-12 w-12 text-stone-300 dark:text-slate-600" />
      <h3 className="text-lg font-semibold text-stone-700 dark:text-slate-200">{title}</h3>
      {message && <p className="max-w-sm text-sm text-stone-500 dark:text-slate-400">{message}</p>}
      {action}
    </div>
  );
}
