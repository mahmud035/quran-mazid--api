import { api } from '@/api/axios';
import { useAuth } from '@/features/auth/useAuth';
import type { ApiEnvelope, Bookmark } from '@/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const KEY = ['bookmarks'] as const;

/**
 * The authenticated user's bookmarks. We fetch the whole list once (cached) and
 * derive per-ayah state client-side via findBookmark — far cheaper than calling
 * /bookmarks/check once per rendered ayah. The /check endpoint stays available
 * for one-off lookups.
 */
export function useBookmarks() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const listQuery = useQuery<Bookmark[]>({
    queryKey: KEY,
    enabled: isAuthenticated,
    staleTime: 30_000,
    queryFn: async () => {
      const res = await api.get<ApiEnvelope<Bookmark[]>>('/bookmarks');
      return res.data.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (input: { surahNumber: number; ayahNumber: number; note?: string }) => {
      const res = await api.post<ApiEnvelope<Bookmark>>('/bookmarks', input);
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/bookmarks/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  });

  const bookmarks = useMemo(() => listQuery.data ?? [], [listQuery.data]);

  const findBookmark = useCallback(
    (surahNumber: number, ayahNumber: number) =>
      bookmarks.find((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    async (surahNumber: number, ayahNumber: number, note?: string) => {
      const existing = findBookmark(surahNumber, ayahNumber);
      if (existing) {
        await removeMutation.mutateAsync(existing._id);
      } else {
        await createMutation.mutateAsync({ surahNumber, ayahNumber, note });
      }
    },
    [findBookmark, createMutation, removeMutation],
  );

  return {
    bookmarks,
    isLoading: listQuery.isLoading,
    isError: listQuery.isError,
    refetch: listQuery.refetch,
    findBookmark,
    toggleBookmark,
    removeBookmark: (id: string) => removeMutation.mutateAsync(id),
  };
}
