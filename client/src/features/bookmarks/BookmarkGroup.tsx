import { Skeleton } from '@/components/ui/Skeleton';
import { useSurah } from '@/features/surahs/useSurah';
import type { Bookmark, TranslationEdition } from '@/types/api';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookmarkGroupProps {
  surahNumber: number;
  items: Bookmark[];
  translationEdition: TranslationEdition;
  onDelete: (id: string) => void;
}

/** All bookmarks for one surah. Fetches the surah once to show Arabic + translation excerpts. */
export function BookmarkGroup({ surahNumber, items, translationEdition, onDelete }: BookmarkGroupProps) {
  const navigate = useNavigate();
  const { data: surah, isLoading } = useSurah(surahNumber, translationEdition);

  const byNumber = new Map(surah?.ayahs.map((a) => [a.numberInSurah, a]));

  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-baseline gap-2 text-lg font-semibold text-stone-800 dark:text-slate-100">
        {surah ? surah.englishName : `Surah ${surahNumber}`}
        {surah && <span className="font-arabic text-xl text-primary dark:text-emerald-300">{surah.name}</span>}
      </h2>

      {isLoading && <Skeleton className="h-24 w-full rounded-xl" />}

      {!isLoading &&
        items.map((b) => {
          const ayah = byNumber.get(b.ayahNumber);
          return (
            <div
              key={b._id}
              className="flex items-start justify-between gap-3 rounded-xl border border-stone-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <button
                onClick={() => navigate(`/surah/${surahNumber}#ayah-${b.ayahNumber}`)}
                className="flex-1 text-left"
              >
                <span className="mb-1 inline-block rounded bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary dark:bg-slate-700 dark:text-emerald-300">
                  Ayah {surahNumber}:{b.ayahNumber}
                </span>
                {ayah && (
                  <>
                    <p className="font-arabic mt-1 text-right text-2xl text-stone-800 dark:text-slate-100">
                      {ayah.arabic}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-stone-600 dark:text-slate-300">
                      {ayah.translation}
                    </p>
                  </>
                )}
                {b.note && (
                  <p className="mt-1 text-xs italic text-stone-400 dark:text-slate-500">{b.note}</p>
                )}
              </button>
              <button
                onClick={() => onDelete(b._id)}
                aria-label="Delete bookmark"
                className="rounded-md p-1.5 text-stone-400 transition-colors hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          );
        })}
    </section>
  );
}
