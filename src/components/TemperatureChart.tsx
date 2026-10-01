import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { HourlyPoint } from '../types/weather';
import { formatHour, round } from '../utils/format';

export default function TemperatureChart({ hours }: { hours: HourlyPoint[] }) {
  const data = hours.map((h) => ({ hour: formatHour(h.time), temp: round(h.temperature) }));

  return (
    <section className="glass p-5 sm:p-6">
      <h3 className="text-lg font-bold">Temperatura ao longo do dia</h3>
      <div className="mt-4 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={28} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} unit="°" domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              formatter={(value: number) => [`${value}°C`, 'Temperatura']}
              contentStyle={{ background: 'var(--card-strong)', border: '1px solid var(--border)', borderRadius: 16, backdropFilter: 'blur(8px)' }}
              labelStyle={{ color: 'var(--muted)' }}
              itemStyle={{ color: 'var(--text)' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} fill="url(#tempFill)" activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
