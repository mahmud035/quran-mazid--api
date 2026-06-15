import type { SurahMeta } from '@/types/quran';
import { ALQURAN_BASE } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AlQuranEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

/** GET /surah — the full list of 114 surahs. Cached forever (text never changes). */
export function useSurahList() {
  return useQuery<SurahMeta[]>({
    queryKey: ['surahs'],
    queryFn: async () => {
      const res = await axios.get<AlQuranEnvelope<SurahMeta[]>>(`${ALQURAN_BASE}/surah`);
      return res.data.data;
    },
  });
}
