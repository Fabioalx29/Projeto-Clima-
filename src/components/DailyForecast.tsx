import type { DailyPoint } from '../types/weather';
import { describeWeather } from '../utils/weatherCodes';
import { formatWeekday, round } from '../utils/format';

export default function DailyForecast({ days }: { days: DailyPoint[] }) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-bold">Previsão para os próximos 7 dias</h3>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {days.map((d, i) => {
          const { label, icon } = describeWeather(d.code);
          return (
            <li key={d.date} className="glass lift flex flex-col items-center gap-2 p-4 text-center">
              <span className="text-sm font-semibold capitalize">{i === 0 ? 'Hoje' : formatWeekday(d.date)}</span>
              <span className="text-3xl" role="img" aria-label={label}>{icon}</span>
              <span className="text-lg font-bold">{round(d.max)}°<span className="muted ml-1.5 text-sm font-medium">{round(d.min)}°</span></span>
              <span className="muted text-xs leading-tight">{label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
