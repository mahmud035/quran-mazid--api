import { Badge } from '@/components/ui/Badge';
import type { SearchMatch } from '@/types/quran';
import { useNavigate } from 'react-router-dom';

/** Wrap case-insensitive occurrences of `keyword` in <mark>. */
function highlight(text: string, keyword: string) {
  const trimmed = keyword.trim();
  if (!trimmed) return text;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <mark key={i} className="rounded bg-amber-200 px-0.5 text-stone-900 dark:bg-amber-400/40 dark:text-amber-50">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface SearchResultsProps {
  matches: SearchMatch[];
  keyword: string;
}

export function SearchResults({ matches, keyword }: SearchResultsProps) {
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-3">
      {matches.map((m) => (
        <li key={m.number}>
          <button
            onClick={() => navigate(`/surah/${m.surah.number}#ayah-${m.numberInSurah}`)}
            className="w-full rounded-xl border border-stone-200 bg-white p-4 text-left transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-1.5 flex items-center gap-2">
              <Badge tone="primary">
                {m.surah.englishName} {m.surah.number}:{m.numberInSurah}
              </Badge>
              <span className="text-xs text-stone-400 dark:text-slate-500">
                {m.surah.englishNameTranslation}
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-slate-300">
              {highlight(m.text, keyword)}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
