import { Layout } from '@/components/layout/Layout';
import { EmptyState } from '@/components/ui/EmptyState';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { SearchPage } from '@/pages/SearchPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { SurahPage } from '@/pages/SurahPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';

function NotFound() {
  return <EmptyState title="Page not found" message="The page you’re looking for doesn’t exist." />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="surah/:number" element={<SurahPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="bookmarks" element={<BookmarksPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
