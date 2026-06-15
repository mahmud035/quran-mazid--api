import { PlayerContext } from '@/context/PlayerContext';
import { useContext } from 'react';

/** Access the audio player context. Throws if used outside <PlayerProvider>. */
export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return ctx;
}
