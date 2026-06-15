import type { Reciter } from '@/types/api';
import { AUDIO_CDN, RECITER_BITRATE } from '@/utils/constants';

/**
 * Build per-ayah audio URLs from the Islamic Network CDN.
 * IMPORTANT: uses the GLOBAL ayah number (1–6236) — i.e. ayah.number from the
 * AlQuran.cloud response — NOT numberInSurah. Bitrate is per-reciter because not
 * every reciter is published at 128kbps (see RECITER_BITRATE).
 */
export function buildPlaylist(globalAyahNumbers: number[], reciter: Reciter): string[] {
  const bitrate = RECITER_BITRATE[reciter];
  return globalAyahNumbers.map((n) => `${AUDIO_CDN}/${bitrate}/${reciter}/${n}.mp3`);
}
