import type { ErrorKind } from '../types/weather';

const COPY: Record<ErrorKind, { icon: string; title: string; hint: string }> = {
  not_found: { icon: '🔎', title: 'Cidade não encontrada', hint: 'Confira a grafia ou tente incluir o estado ou país.' },
  api: { icon: '⚠️', title: 'Serviço indisponível', hint: 'A API de previsão falhou. Tente novamente em instantes.' },
  geolocation: { icon: '📍', title: 'Não foi possível usar sua localização', hint: 'Pesquise uma cidade manualmente.' },
  offline: { icon: '📡', title: 'Sem conexão', hint: 'Verifique sua internet e tente de novo.' },
};

interface Props { kind: ErrorKind; message: string; onRetry?: () => void; }

export default function ErrorMessage({ kind, message, onRetry }: Props) {
  const { icon, title, hint } = COPY[kind];
  return (
    <div role="alert" className="glass animate-enter mx-auto max-w-lg p-8 text-center">
      <div className="text-5xl" aria-hidden>{icon}</div>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="muted mt-2 text-sm">{message}</p>
      <p className="muted text-sm">{hint}</p>
      {onRetry && kind !== 'not_found' && kind !== 'geolocation' && (
        <button onClick={onRetry} className="btn btn-primary mt-6">Tentar novamente</button>
      )}
    </div>
  );
}
