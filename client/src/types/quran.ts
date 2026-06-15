// Types for the AlQuran.cloud public API (https://api.alquran.cloud/v1).

/** One entry from GET /surah (the 114-surah list). */
export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

/** A single ayah inside an edition payload. */
export interface Ayah {
  number: number; // GLOBAL ayah number (1–6236) — used to build audio playlist
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

/** Edition metadata attached to a surah payload. */
export interface EditionInfo {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  type: string; // 'quran' | 'transliteration' | 'translation' | ...
}

/** One edition's view of a surah, from GET /surah/{n}/editions/{...}. */
export interface SurahEdition extends Omit<SurahMeta, never> {
  ayahs: Ayah[];
  edition: EditionInfo;
}

/** A single result from GET /search/{keyword}/all/{edition}. */
export interface SearchMatch {
  number: number; // global ayah number
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
  };
  edition: EditionInfo;
}

export interface SearchResponse {
  count: number;
  matches: SearchMatch[];
}
