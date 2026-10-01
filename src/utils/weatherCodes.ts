// Códigos WMO usados pela Open-Meteo
const CODES: Record<number, { label: string; day: string; night: string }> = {
  0: { label: 'Céu limpo', day: '☀️', night: '🌙' },
  1: { label: 'Predominantemente limpo', day: '🌤️', night: '🌙' },
  2: { label: 'Parcialmente nublado', day: '⛅', night: '☁️' },
  3: { label: 'Nublado', day: '☁️', night: '☁️' },
  45: { label: 'Neblina', day: '🌫️', night: '🌫️' },
  48: { label: 'Neblina com geada', day: '🌫️', night: '🌫️' },
  51: { label: 'Garoa leve', day: '🌦️', night: '🌧️' },
  53: { label: 'Garoa', day: '🌦️', night: '🌧️' },
  55: { label: 'Garoa forte', day: '🌧️', night: '🌧️' },
  56: { label: 'Garoa congelante', day: '🌧️', night: '🌧️' },
  57: { label: 'Garoa congelante forte', day: '🌧️', night: '🌧️' },
  61: { label: 'Chuva fraca', day: '🌦️', night: '🌧️' },
  63: { label: 'Chuva', day: '🌧️', night: '🌧️' },
  65: { label: 'Chuva forte', day: '🌧️', night: '🌧️' },
  66: { label: 'Chuva congelante', day: '🌧️', night: '🌧️' },
  67: { label: 'Chuva congelante forte', day: '🌧️', night: '🌧️' },
  71: { label: 'Neve fraca', day: '🌨️', night: '🌨️' },
  73: { label: 'Neve', day: '❄️', night: '❄️' },
  75: { label: 'Neve forte', day: '❄️', night: '❄️' },
  77: { label: 'Grãos de neve', day: '🌨️', night: '🌨️' },
  80: { label: 'Pancadas de chuva', day: '🌦️', night: '🌧️' },
  81: { label: 'Pancadas moderadas', day: '🌧️', night: '🌧️' },
  82: { label: 'Pancadas fortes', day: '⛈️', night: '⛈️' },
  85: { label: 'Pancadas de neve', day: '🌨️', night: '🌨️' },
  86: { label: 'Pancadas de neve fortes', day: '❄️', night: '❄️' },
  95: { label: 'Tempestade', day: '⛈️', night: '⛈️' },
  96: { label: 'Tempestade com granizo', day: '⛈️', night: '⛈️' },
  99: { label: 'Tempestade com granizo forte', day: '⛈️', night: '⛈️' },
};

export function describeWeather(code: number, isDay = true) {
  const entry = CODES[code] ?? { label: 'Indefinido', day: '🌡️', night: '🌡️' };
  return { label: entry.label, icon: isDay ? entry.day : entry.night };
}
