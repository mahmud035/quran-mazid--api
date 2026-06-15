import { Skeleton } from '@/components/ui/Skeleton';
import type { SurahMeta } from '@/types/quran';
import { SurahCard } from './SurahCard';

const GRID = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';

interface SurahGridProps {
  surahs: SurahMeta[];
  isFavourite: (surahNumber: number) => boolean;
  onToggleFavourite: (surahNumber: number) => void;
}

export function SurahGrid({ surahs, isFavourite, onToggleFavourite }: SurahGridProps) {
  return (
    <div className={GRID}>
      {surahs.map((surah) => (
        <SurahCard
          key={surah.number}
          surah={surah}
          isFavourite={isFavourite(surah.number)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}

/** Skeleton placeholder shown while the surah list loads. */
export function SurahGridSkeleton() {
  return (
    <div className={GRID}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-xl" />
      ))}
    </div>
  );
}
