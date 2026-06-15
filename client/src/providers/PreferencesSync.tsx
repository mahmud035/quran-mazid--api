import { useAuth } from '@/features/auth/useAuth';
import { usePlayer } from '@/features/player/usePlayer';
import { useSettings } from '@/features/settings/useSettings';
import { useTheme } from '@/providers/ThemeProvider';
import { useEffect, useRef } from 'react';

/**
 * On login, apply the user's server-saved theme + reciter once (cross-device sync).
 * Guests are untouched: their theme is device-local (ThemeProvider/localStorage) and
 * their reciter is whatever they pick in the player. Headless — renders nothing.
 */
export function PreferencesSync() {
  const { isAuthenticated } = useAuth();
  const { preferences, isLoading } = useSettings();
  const { setTheme } = useTheme();
  const { setReciter, state } = usePlayer();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      syncedRef.current = false; // reset so the next login re-syncs
      return;
    }
    if (isLoading || syncedRef.current) return;

    setTheme(preferences.theme);
    if (state.currentSurah === null) {
      setReciter(preferences.reciter);
    }
    syncedRef.current = true;
  }, [isAuthenticated, isLoading, preferences, setTheme, setReciter, state.currentSurah]);

  return null;
}
