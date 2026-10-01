import type { WeatherData } from '../types/weather';
import { describeWeather } from '../utils/weatherCodes';
import { formatDateTime, round } from '../utils/format';

export default function CurrentWeather({ data }: { data: WeatherData }) {
  const { location, current: c } = data;
  const { label, icon } = describeWeather(c.code, c.isDay);

  return (
    <section className="glass relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {location.name}{location.country && <span className="muted font-medium">, {location.country}</span>}
          </h2>
          <p className="muted mt-1 text-sm capitalize">{formatDateTime(c.time)}</p>
          <p className="mt-6 text-lg font-medium">{label}</p>
          <p className="muted text-sm">Sensação térmica: {round(c.feelsLike)}°C</p>
          <p className="muted mt-1 text-sm">Máxima {round(c.max)}° · Mínima {round(c.min)}°</p>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:items-end">
          <span className="text-7xl sm:text-8xl" role="img" aria-label={label}>{icon}</span>
          <span className="text-6xl font-extrabold tracking-tight sm:text-7xl">{round(c.temperature)}°C</span>
        </div>
      </div>
    </section>
  );
}
