import type { CurrentConditions } from '../types/weather';
import { round, uvLabel, windDirectionLabel } from '../utils/format';

interface CardProps { icon: string; title: string; value: string; hint: string; }

function DetailCard({ icon, title, value, hint }: CardProps) {
  return (
    <div className="glass lift p-5">
      <div className="muted flex items-center gap-2 text-sm"><span aria-hidden>{icon}</span>{title}</div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="muted mt-1 text-xs">{hint}</p>
    </div>
  );
}

export default function WeatherDetails({ current: c }: { current: CurrentConditions }) {
  const humidityHint = c.humidity > 70 ? 'Ar úmido' : c.humidity < 30 ? 'Ar seco' : 'Nível confortável';
  const windHint = c.windSpeed < 12 ? 'Vento fraco' : c.windSpeed < 40 ? 'Vento moderado' : 'Vento forte';
  const visKm = c.visibility / 1000;
  return (
    <section aria-label="Detalhes do clima" className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
      <DetailCard icon="💧" title="Umidade" value={`${round(c.humidity)}%`} hint={humidityHint} />
      <DetailCard icon="💨" title="Velocidade do vento" value={`${round(c.windSpeed)} km/h`} hint={windHint} />
      <DetailCard icon="🧭" title="Direção do vento" value={windDirectionLabel(c.windDirection)} hint={`${round(c.windDirection)}° em relação ao norte`} />
      <DetailCard icon="👁️" title="Visibilidade" value={`${visKm >= 10 ? round(visKm) : visKm.toFixed(1)} km`} hint={visKm >= 10 ? 'Visibilidade excelente' : 'Visibilidade reduzida'} />
      <DetailCard icon="🌡️" title="Pressão atmosférica" value={`${round(c.pressure)} hPa`} hint="Ao nível do mar" />
      <DetailCard icon="☀️" title="Índice UV" value={c.uvIndex.toFixed(1)} hint={uvLabel(c.uvIndex)} />
    </section>
  );
}
