import type { HourlyPoint } from '../types/weather';
import { describeWeather } from '../utils/weatherCodes';
import { formatHour, round } from '../utils/format';

export default function HourlyForecast({ hours }: { hours: HourlyPoint[] }) {
  return (
    <section className="glass p-5 sm:p-6">
      <h3 className="text-lg font-bold">Próximas horas</h3>
      <ul className="scroll-thin -mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-3">
        {hours.map((h, i) => {
          const { label, icon } = describeWeather(h.code, h.isDay);
          return (
            <li key={h.time} className="glass-strong lift flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-2xl border py-4" style={{ borderColor: 'var(--border)' }}>
              <span className="muted text-xs">{i === 0 ? 'Agora' : formatHour(h.time)}</span>
              <span className="text-2xl" role="img" aria-label={label}>{icon}</span>
              <span className="font-bold">{round(h.temperature)}°</span>
              <span className="text-xs text-sky-400">💧 {round(h.precipitation)}%</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
