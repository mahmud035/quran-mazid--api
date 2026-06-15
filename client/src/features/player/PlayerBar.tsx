import { ProgressBar } from '@/features/player/ProgressBar';
import { ReciterSelect } from '@/features/player/ReciterSelect';
import { usePlayer } from '@/features/player/usePlayer';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

/** Persistent bottom audio bar — renders only once a surah is loaded. */
export function PlayerBar() {
  const { state, togglePlay, next, prev, seek, setReciter } = usePlayer();

  if (state.currentSurah === null || state.playlist.length === 0) return null;

  const total = state.playlist.length;
  const position = state.currentAyahIndex + 1;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/60 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous ayah"
            className="rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
            className="rounded-full bg-primary p-2.5 text-white hover:bg-primary-hover"
          >
            {state.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <button
            onClick={next}
            aria-label="Next ayah"
            className="rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <div className="ml-1 hidden text-sm text-stone-600 dark:text-slate-300 sm:block">
            Surah {state.currentSurah}{' '}
            <span className="text-stone-400 dark:text-slate-500">
              • Ayah {position}/{total}
            </span>
          </div>

          <div className="ml-auto">
            <ReciterSelect value={state.reciter} onChange={setReciter} />
          </div>
        </div>

        <ProgressBar currentTime={state.currentTime} duration={state.duration} onSeek={seek} />
      </div>
    </div>
  );
}
