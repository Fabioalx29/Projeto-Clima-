import { useState, type FormEvent } from 'react';

interface Props {
  loading: boolean;
  onSearch: (city: string) => void;
  onLocate: () => void;
}

export default function SearchBar({ loading, onSearch, onLocate }: Props) {
  const [value, setValue] = useState('');
  const canLocate = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const submit = (e: FormEvent) => {
    e.preventDefault(); // Enter também dispara o submit
    if (!loading && value.trim()) onSearch(value);
  };

  return (
    <section className="glass p-3 sm:p-4">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Pesquisar Cidade</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" aria-hidden>🔍</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Pesquise uma cidade..."
            autoComplete="off"
            className="glass-strong w-full rounded-2xl border py-4 pl-12 pr-4 text-base outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400"
            style={{ borderColor: 'var(--border)' }}
          />
        </label>
        <button type="submit" disabled={loading || !value.trim()} className="btn btn-primary py-4 sm:px-8">
          {loading ? 'Pesquisando…' : 'Pesquisar'}
        </button>
        {canLocate && (
          <button type="button" onClick={onLocate} disabled={loading} className="btn btn-ghost py-4">
            Usar minha localização
          </button>
        )}
      </form>
    </section>
  );
}
