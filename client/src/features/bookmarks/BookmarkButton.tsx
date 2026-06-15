import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/features/auth/useAuth';
import { useBookmarks } from '@/features/bookmarks/useBookmarks';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookmarkButtonProps {
  surahNumber: number;
  ayahNumber: number;
}

export function BookmarkButton({ surahNumber, ayahNumber }: BookmarkButtonProps) {
  const { isAuthenticated } = useAuth();
  const { findBookmark, toggleBookmark } = useBookmarks();
  const navigate = useNavigate();
  const [promptOpen, setPromptOpen] = useState(false);

  const bookmarked = isAuthenticated ? Boolean(findBookmark(surahNumber, ayahNumber)) : false;

  const handleClick = () => {
    if (!isAuthenticated) {
      setPromptOpen(true);
      return;
    }
    void toggleBookmark(surahNumber, ayahNumber);
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this ayah'}
        aria-pressed={bookmarked}
        className="rounded-md p-1.5 text-stone-400 transition-colors hover:text-primary dark:text-slate-500 dark:hover:text-emerald-300"
      >
        {bookmarked ? (
          <BookmarkCheck className="h-5 w-5 fill-primary text-primary dark:fill-emerald-400 dark:text-emerald-400" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </button>

      <Modal open={promptOpen} onClose={() => setPromptOpen(false)} title="Login required">
        <p className="mb-5 text-sm text-stone-600 dark:text-slate-300">
          Log in to bookmark ayahs and sync them across your devices.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setPromptOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={() => navigate('/login')}>
            Log in
          </Button>
        </div>
      </Modal>
    </>
  );
}
