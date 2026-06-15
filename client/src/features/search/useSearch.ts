import type { SearchMatch, SearchResponse } from '@/types/quran';
import { ALQURAN_BASE } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AlQuranEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

export const MIN_QUERY_LENGTH = 2;

/**
 * Server-side search via AlQuran.cloud. A no-result keyword returns HTTP 404 from
 * the API, which we normalise to an empty match list (not an error state).
 */
export function useSearch(keyword: string, edition = 'en.pickthall') {
  const trimmed = keyword.trim();

  return useQuery<SearchMatch[]>({
    queryKey: ['search', edition, trimmed],
    enabled: trimmed.length >= MIN_QUERY_LENGTH,
    queryFn: async () => {
      try {
        const res = await axios.get<AlQuranEnvelope<SearchResponse>>(
          `${ALQURAN_BASE}/search/${encodeURIComponent(trimmed)}/all/${edition}`,
        );
        return res.data.data.matches;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          return [];
        }
        throw err;
      }
    },
  });
}
