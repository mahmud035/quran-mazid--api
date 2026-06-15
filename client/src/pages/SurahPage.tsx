import { EmptyState } from '@/components/ui/EmptyState';
import { SurahReader } from '@/features/surahs/SurahReader';
import { BookOpen } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function SurahPage() {
  const { number } = useParams();
  const surahNumber = Number(number);

  if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Surah not found"
        message="Pick a surah between 1 and 114."
      />
    );
  }

  return <SurahReader surahNumber={surahNumber} />;
}
