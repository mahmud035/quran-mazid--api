// "Continue Reading" position — stored in localStorage only (no DB write on scroll).

const KEY = 'qm:last-read';

export interface LastRead {
  surahNumber: number;
  surahName: string; // English name, for the chip label
  ayahNumber: number;
}

export function getLastRead(): LastRead | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LastRead) : null;
  } catch {
    return null;
  }
}

export function setLastRead(value: LastRead): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}
