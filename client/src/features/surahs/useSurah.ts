import type { TranslationEdition } from '@/types/api';
import type { SurahEdition } from '@/types/quran';
import { ALQURAN_BASE, EDITION_ARABIC, EDITION_TRANSLITERATION } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AlQuranEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

/** One ayah, with all three editions zipped together for rendering. */
export interface ReaderAyah {
  numberInSurah: number;
  globalNumber: number; // global ayah number (1–6236) — drives the audio playlist
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface ReaderSurah {
  number: number;
  name: string; // Arabic
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: ReaderAyah[];
  /** Global ayah numbers in order — handed to the playlist builder in Batch 4. */
  globalAyahNumbers: number[];
}

/**
 * Fetch a surah in three editions at once (Arabic + transliteration + translation)
 * and zip them by index into one ayah list. Cached forever per (surah, translation).
 */
export function useSurah(surahNumber: number, translationEdition: TranslationEdition) {
  return useQuery<ReaderSurah>({
    queryKey: ['surah', surahNumber, translationEdition],
    queryFn: async () => {
      const editions = `${EDITION_ARABIC},${EDITION_TRANSLITERATION},${translationEdition}`;
      const res = await axios.get<AlQuranEnvelope<SurahEdition[]>>(
        `${ALQURAN_BASE}/surah/${surahNumber}/editions/${editions}`,
      );
      const [arabic, translit, translation] = res.data.data;

      // Zip the three edition arrays by index — one loop, never three.
      const ayahs: ReaderAyah[] = arabic.ayahs.map((ayah, i) => ({
        numberInSurah: ayah.numberInSurah,
        globalNumber: ayah.number,
        arabic: ayah.text,
        transliteration: translit.ayahs[i]?.text ?? '',
        translation: translation.ayahs[i]?.text ?? '',
      }));

      return {
        number: arabic.number,
        name: arabic.name,
        englishName: arabic.englishName,
        englishNameTranslation: arabic.englishNameTranslation,
        numberOfAyahs: arabic.numberOfAyahs,
        revelationType: arabic.revelationType,
        ayahs,
        globalAyahNumbers: ayahs.map((a) => a.globalNumber),
      };
    },
  });
}
