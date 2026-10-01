interface Props { theme: 'dark' | 'light'; onToggleTheme: () => void; }

export default function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-xl shadow-lg shadow-sky-500/20">⛅</div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">Weatherly</h1>
          <p className="muted text-xs sm:text-sm">Previsão do tempo</p>
        </div>
      </div>
      <button
        onClick={onToggleTheme}
        className="btn btn-ghost !px-4 !py-2.5"
        aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      >
        <span aria-hidden>{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span className="hidden sm:inline">{theme === 'dark' ? 'Tema claro' : 'Tema escuro'}</span>
      </button>
    </header>
  );
}
