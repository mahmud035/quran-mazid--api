import { Badge } from '@/components/ui/Badge';
import type { SurahMeta } from '@/types/quran';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SurahCardProps {
  surah: SurahMeta;
  isFavourite: boolean;
  onToggleFavourite: (surahNumber: number) => void;
}

export function SurahCard({ surah, isFavourite, onToggleFavourite }: SurahCardProps) {
  return (
    <Link
      to={`/surah/${surah.number}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary dark:bg-slate-700 dark:text-emerald-300">
          {surah.number}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavourite(surah.number);
          }}
          aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
          aria-pressed={isFavourite}
          className="rounded-full p-1.5 text-stone-300 transition-colors hover:text-red-400 dark:text-slate-600"
        >
          <Heart
            className={`h-5 w-5 ${isFavourite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-stone-800 dark:text-slate-100">{surah.englishName}</h3>
          <span className="font-arabic text-xl text-primary dark:text-emerald-300">
            {surah.name}
          </span>
        </div>
        <p className="text-sm text-stone-500 dark:text-slate-400">
          {surah.englishNameTranslation}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <Badge tone={surah.revelationType === 'Meccan' ? 'meccan' : 'medinan'}>
          {surah.revelationType}
        </Badge>
        <span className="text-xs text-stone-400 dark:text-slate-500">
          {surah.numberOfAyahs} ayahs
        </span>
      </div>
    </Link>
  );
}
