import { LoginForm } from '@/features/auth/LoginForm';
import { useAuth } from '@/features/auth/useAuth';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-1 text-xl font-bold text-stone-800 dark:text-slate-100">Welcome back</h1>
        <p className="mb-6 text-sm text-stone-500 dark:text-slate-400">
          Log in to sync your bookmarks and settings.
        </p>
        <LoginForm redirectTo={from} />
        <p className="mt-4 text-center text-sm text-stone-500 dark:text-slate-400">
          No account?{' '}
          <Link to="/register" className="font-medium text-primary dark:text-emerald-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
