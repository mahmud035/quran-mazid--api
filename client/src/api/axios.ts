import axios from 'axios';

/**
 * Axios instance for OUR backend (auth, bookmarks, settings).
 * withCredentials lets the HTTP-only JWT cookie ride along on every request.
 * AlQuran.cloud is called separately (see utils/constants ALQURAN_BASE).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: true,
});
