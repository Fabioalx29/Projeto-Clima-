interface Props { items: string[]; disabled: boolean; onSelect: (city: string) => void; onClear: () => void; }

export default function RecentSearches({ items, disabled, onSelect, onClear }: Props) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-wrap items-center gap-2" aria-label="Pesquisas recentes">
      <h3 className="muted mr-1 text-sm font-semibold">Pesquisas recentes</h3>
      {items.map((city) => (
        <button key={city} disabled={disabled} onClick={() => onSelect(city)} className="btn btn-ghost !rounded-full !px-4 !py-1.5 !font-medium">
          {city}
        </button>
      ))}
      <button onClick={onClear} className="muted text-xs underline-offset-2 hover:underline">Limpar</button>
    </section>
  );
}
