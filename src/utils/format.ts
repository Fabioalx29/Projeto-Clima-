export const round = (n: number) => Math.round(n);

const DIRECTIONS = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
export const windDirectionLabel = (deg: number) => DIRECTIONS[Math.round(deg / 45) % 8];

// O horário vem da API já no fuso da cidade; formatamos sem converter fuso.
const parse = (iso: string) => new Date(iso.length === 10 ? `${iso}T00:00` : iso);

export const formatDateTime = (iso: string) =>
  parse(iso).toLocaleString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' });
export const formatHour = (iso: string) => parse(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
export const formatWeekday = (iso: string) =>
  parse(iso).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

export function uvLabel(uv: number) {
  if (uv < 3) return 'Baixo';
  if (uv < 6) return 'Moderado';
  if (uv < 8) return 'Alto';
  if (uv < 11) return 'Muito alto';
  return 'Extremo';
}
