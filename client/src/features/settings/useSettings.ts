import { api } from '@/api/axios';
import { useAuth } from '@/features/auth/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ApiEnvelope, FontSize, Reciter, Theme, TranslationEdition, UserSettings } from '@/types/api';
import { DEFAULT_FONT_SIZE, DEFAULT_RECITER, DEFAULT_TRANSLATION } from '@/utils/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export interface Preferences {
  reciter: Reciter;
  translationEdition: TranslationEdition;
  fontSize: FontSize;
  theme: Theme;
}

const DEFAULTS: Preferences = {
  reciter: DEFAULT_RECITER,
  translationEdition: DEFAULT_TRANSLATION,
  fontSize: DEFAULT_FONT_SIZE,
  theme: 'light',
};

const pick = (s: UserSettings): Preferences => ({
  reciter: s.reciter,
  translationEdition: s.translationEdition,
  fontSize: s.fontSize,
  theme: s.theme,
});

/**
 * Reading preferences with a guest/auth split:
 * - guest: persisted to localStorage
 * - authenticated: synced to GET/PUT /api/settings (TanStack Query)
 * Both expose the same { preferences, updatePreferences } interface.
 */
export function useSettings() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [guestPrefs, setGuestPrefs] = useLocalStorage<Preferences>('qm:settings', DEFAULTS);

  const settingsQuery = useQuery<Preferences>({
    queryKey: ['settings'],
    enabled: isAuthenticated,
    staleTime: 60_000,
    queryFn: async () => {
      const res = await api.get<ApiEnvelope<UserSettings>>('/settings');
      return pick(res.data.data);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (patch: Partial<Preferences>) => {
      const res = await api.put<ApiEnvelope<UserSettings>>('/settings', patch);
      return pick(res.data.data);
    },
    onSuccess: (prefs) => queryClient.setQueryData(['settings'], prefs),
  });

  const preferences: Preferences = isAuthenticated
    ? (settingsQuery.data ?? DEFAULTS)
    : guestPrefs;

  const updatePreferences = useCallback(
    async (patch: Partial<Preferences>) => {
      if (isAuthenticated) {
        await updateMutation.mutateAsync(patch);
      } else {
        setGuestPrefs((prev) => ({ ...prev, ...patch }));
      }
    },
    [isAuthenticated, updateMutation, setGuestPrefs],
  );

  return {
    preferences,
    updatePreferences,
    isLoading: isAuthenticated && settingsQuery.isLoading,
  };
}
