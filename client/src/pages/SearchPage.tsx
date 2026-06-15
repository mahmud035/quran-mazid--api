import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchBar } from '@/features/search/SearchBar';
import { SearchResults } from '@/features/search/SearchResults';
import { MIN_QUERY_LENGTH, useSearch } from '@/features/search/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const debounced = useDebounce(keyword, 400);
  const { data: matches, isFetching, isError, refetch } = useSearch(debounced);

  const tooShort = debounced.trim().length < MIN_QUERY_LENGTH;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <h1 className="text-2xl font-bold text-stone-800 dark:text-slate-100">Search</h1>
      <SearchBar value={keyword} onChange={setKeyword} />

      {tooShort && (
        <EmptyState
          icon={Search}
          title="Search the Quran"
          message={`Type at least ${MIN_QUERY_LENGTH} characters to search translations.`}
        />
      )}

      {!tooShort && isFetching && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!tooShort && isError && (
        <ErrorState message="Search failed. Please try again." onRetry={() => refetch()} />
      )}

      {!tooShort && !isFetching && !isError && matches && (
        <>
          {matches.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No results"
              message={`Nothing matched “${debounced.trim()}”.`}
            />
          ) : (
            <>
              <p className="text-sm text-stone-400 dark:text-slate-500">
                {matches.length} result{matches.length === 1 ? '' : 's'}
              </p>
              <SearchResults matches={matches} keyword={debounced} />
            </>
          )}
        </>
      )}
    </div>
  );
}
