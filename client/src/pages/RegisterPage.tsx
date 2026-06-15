import { RegisterForm } from '@/features/auth/RegisterForm';
import { useAuth } from '@/features/auth/useAuth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="mb-1 text-xl font-bold text-stone-800 dark:text-slate-100">
          Create your account
        </h1>
        <p className="mb-6 text-sm text-stone-500 dark:text-slate-400">
          Save bookmarks and reading preferences across devices.
        </p>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-stone-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary dark:text-emerald-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
