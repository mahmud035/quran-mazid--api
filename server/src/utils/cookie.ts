import { CookieOptions, Response } from 'express';
import { config } from '../config';

export const AUTH_COOKIE = 'token';

const baseOptions: CookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  // lab-quran + lab-quran-api share the registrable domain halalaura.co.uk → same-site.
  // Lax cookies ARE sent on that cross-origin-but-same-site fetch, so Lax is sufficient
  // AND tighter than None: smaller CSRF surface, and unambiguously first-party so privacy
  // modes (Safari ITP / Firefox ETP / Brave) won't interfere. None is only needed if the
  // API ever moves to a *different* root domain.
  sameSite: 'lax',
  path: '/',
};

/** Set the HTTP-only auth cookie holding the JWT (7-day lifetime). */
export const setAuthCookie = (res: Response, token: string): void => {
  res.cookie(AUTH_COOKIE, token, {
    ...baseOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/** Clear the auth cookie on logout (options must match those used to set it). */
export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(AUTH_COOKIE, baseOptions);
};
