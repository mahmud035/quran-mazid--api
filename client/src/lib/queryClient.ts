import { QueryClient } from '@tanstack/react-query';

/**
 * Quran text from AlQuran.cloud never changes, so cache it forever and never
 * refetch on focus. User-data queries (bookmarks/settings) override staleTime
 * per-query where freshness matters.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
