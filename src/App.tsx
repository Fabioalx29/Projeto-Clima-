import { useRef } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import TemperatureChart from './components/TemperatureChart';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { useTheme } from './hooks/useTheme';
import { useWeather } from './hooks/useWeather';

export default function App() {
  const { theme, toggle } = useTheme();
  const { state, searchCity, locate, recent } = useWeather();
  const lastQuery = useRef('');
  const loading = state.status === 'loading';

  const search = (city: string) => {
    lastQuery.current = city;
    searchCity(city);
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl space-y-6 px-4 py-6 font-sans sm:px-6 sm:py-10">
      <Header theme={theme} onToggleTheme={toggle} />
      <SearchBar loading={loading} onSearch={search} onLocate={locate} />
      <RecentSearches items={recent.items} disabled={loading} onSelect={search} onClear={recent.clear} />

      <main>
        {state.status === 'idle' && (
          <div className="glass animate-enter mx-auto max-w-lg p-10 text-center">
            <div className="text-6xl" aria-hidden>🌍</div>
            <h2 className="mt-4 text-xl font-bold">Para onde vamos olhar o céu?</h2>
            <p className="muted mt-2 text-sm">Pesquise uma cidade ou use sua localização para ver o clima agora e a previsão dos próximos dias.</p>
          </div>
        )}
        {loading && <Loading />}
        {state.status === 'error' && (
          <ErrorMessage kind={state.kind} message={state.message} onRetry={() => lastQuery.current && searchCity(lastQuery.current)} />
        )}
        {state.status === 'success' && (
          <div className="animate-enter space-y-6">
            <CurrentWeather data={state.data} />
            <WeatherDetails current={state.data.current} />
            <HourlyForecast hours={state.data.hourlyNext} />
            <TemperatureChart hours={state.data.hourlyToday} />
            <DailyForecast days={state.data.daily} />
          </div>
        )}
      </main>

      <footer className="muted pt-4 text-center text-xs">
        Dados por <a className="underline" href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a> · Feito com React, TypeScript e Tailwind
      </footer>
    </div>
  );
}
