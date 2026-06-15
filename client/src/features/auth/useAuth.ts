import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

/** Access the auth context. Throws if used outside <AuthProvider>. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
