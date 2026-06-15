interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function format(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 text-right text-xs tabular-nums text-stone-500 dark:text-slate-400">
        {format(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Seek"
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-stone-200 accent-primary dark:bg-slate-700"
      />
      <span className="w-10 text-xs tabular-nums text-stone-500 dark:text-slate-400">
        {format(duration)}
      </span>
    </div>
  );
}
