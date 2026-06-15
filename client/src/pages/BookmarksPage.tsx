import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { BookmarkGroup } from '@/features/bookmarks/BookmarkGroup';
import { useBookmarks } from '@/features/bookmarks/useBookmarks';
import { useSettings } from '@/features/settings/useSettings';
import type { Bookmark } from '@/types/api';
import { BookMarked } from 'lucide-react';
import { useMemo } from 'react';

export function BookmarksPage() {
  const { bookmarks, isLoading, isError, refetch, removeBookmark } = useBookmarks();
  const { preferences } = useSettings();

  // Only ayah bookmarks here (ayahNumber >= 1); surah-level favourites live on the home grid.
  const grouped = useMemo(() => {
    const map = new Map<number, Bookmark[]>();
    for (const b of bookmarks) {
      if (b.ayahNumber < 1) continue;
      const list = map.get(b.surahNumber) ?? [];
      list.push(b);
      map.set(b.surahNumber, list);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [bookmarks]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-slate-100">Bookmarks</h1>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isError && <ErrorState message="Could not load your bookmarks." onRetry={() => refetch()} />}

      {!isLoading && !isError && grouped.length === 0 && (
        <EmptyState
          icon={BookMarked}
          title="No bookmarks yet"
          message="Tap the bookmark icon on any ayah while reading to save it here."
        />
      )}

      {!isLoading &&
        !isError &&
        grouped.map(([surahNumber, items]) => (
          <BookmarkGroup
            key={surahNumber}
            surahNumber={surahNumber}
            items={items}
            translationEdition={preferences.translationEdition}
            onDelete={(id) => void removeBookmark(id)}
          />
        ))}
    </div>
  );
}
