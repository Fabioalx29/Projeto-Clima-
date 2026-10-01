import { useCallback, useState } from 'react';

const KEY = 'weatherly:recent';
const MAX = 5;

function read(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function useRecentSearches() {
  const [items, setItems] = useState<string[]>(read);

  const add = useCallback((city: string) => {
    setItems((prev) => {
      const next = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage indisponível */ }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try { localStorage.removeItem(KEY); } catch { /* noop */ }
  }, []);

  return { items, add, clear };
}
