import { BookmarkButton } from '@/features/bookmarks/BookmarkButton';
import type { ReaderAyah } from '@/features/surahs/useSurah';
import type { FontSize } from '@/types/api';
import { ARABIC_TEXT_SIZE } from '@/utils/constants';
import { Play } from 'lucide-react';

interface AyahCardProps {
  ayah: ReaderAyah;
  surahNumber: number;
  fontSize: FontSize;
  isActive?: boolean; // driven by the audio player (Batch 4)
  onPlay?: () => void; // jump playback to this ayah (Batch 4)
}

export function AyahCard({ ayah, surahNumber, fontSize, isActive = false, onPlay }: AyahCardProps) {
  return (
    <article
      id={`ayah-${ayah.numberInSurah}`}
      className={`scroll-mt-24 rounded-xl border p-5 transition-colors ${
        isActive
          ? 'border-l-4 border-l-accent border-stone-200 bg-accent/5 dark:border-slate-700 dark:bg-accent/10'
          : 'border-stone-200 bg-white dark:border-slate-700 dark:bg-slate-800'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary dark:bg-slate-700 dark:text-emerald-300">
          {surahNumber}:{ayah.numberInSurah}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onPlay}
            aria-label="Play this ayah"
            className="rounded-md p-1.5 text-stone-400 transition-colors hover:text-primary dark:text-slate-500 dark:hover:text-emerald-300"
          >
            <Play className="h-5 w-5" />
          </button>
          <BookmarkButton surahNumber={surahNumber} ayahNumber={ayah.numberInSurah} />
        </div>
      </div>

      <p
        className={`font-arabic mb-4 text-right text-stone-800 dark:text-slate-100 ${ARABIC_TEXT_SIZE[fontSize]}`}
      >
        {ayah.arabic}
      </p>

      {ayah.transliteration && (
        <p className="mb-2 text-sm italic text-stone-500 dark:text-slate-400">
          {ayah.transliteration}
        </p>
      )}

      <p className="text-stone-600 dark:text-slate-300">{ayah.translation}</p>
    </article>
  );
}
