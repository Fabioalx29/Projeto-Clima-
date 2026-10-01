import type {
  DailyPoint, ErrorKind, ForecastResponse, GeocodingResponse, HourlyPoint,
  Location, ReverseGeocodeResponse, WeatherData,
} from '../types/weather';

const FORECAST_URL = import.meta.env.VITE_FORECAST_URL ?? 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL ?? 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
const API_KEY = import.meta.env.VITE_OPEN_METEO_API_KEY as string | undefined; // opcional

export class AppError extends Error {
  kind: ErrorKind;
  constructor(kind: ErrorKind, message: string) {
    super(message);
    this.kind = kind;
  }
}

async function getJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    if (!navigator.onLine) throw new AppError('offline', 'Sem conexão com a internet.');
    throw new AppError('api', 'Não foi possível contactar o serviço de previsão.');
  }
  if (!res.ok) throw new AppError('api', `O serviço de previsão respondeu com erro (${res.status}).`);
  return (await res.json()) as T;
}

export async function geocodeCity(query: string): Promise<Location> {
  const params = new URLSearchParams({ name: query, count: '1', language: 'pt', format: 'json' });
  const data = await getJson<GeocodingResponse>(`${GEOCODING_URL}?${params}`);
  const hit = data.results?.[0];
  if (!hit) throw new AppError('not_found', `Nenhuma cidade encontrada para "${query}".`);
  return { name: hit.name, country: hit.country ?? '', latitude: hit.latitude, longitude: hit.longitude };
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<Location> {
  try {
    const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), localityLanguage: 'pt' });
    const data = await getJson<ReverseGeocodeResponse>(`${REVERSE_URL}?${params}`);
    return { name: data.city || data.locality || 'Minha localização', country: data.countryName ?? '', latitude, longitude };
  } catch {
    return { name: 'Minha localização', country: '', latitude, longitude };
  }
}

export async function fetchWeather(location: Location): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,precipitation_probability,weather_code,is_day,visibility,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });
  if (API_KEY) params.set('apikey', API_KEY);
  const raw = await getJson<ForecastResponse>(`${FORECAST_URL}?${params}`);
  return normalize(location, raw);
}

function normalize(location: Location, raw: ForecastResponse): WeatherData {
  const { current: c, hourly: h, daily: d } = raw;
  const hourly: HourlyPoint[] = h.time.map((time, i) => ({
    time,
    temperature: h.temperature_2m[i],
    precipitation: h.precipitation_probability[i] ?? 0,
    code: h.weather_code[i],
    isDay: h.is_day[i] === 1,
  }));
  const daily: DailyPoint[] = d.time.map((date, i) => ({
    date,
    min: d.temperature_2m_min[i],
    max: d.temperature_2m_max[i],
    code: d.weather_code[i],
    precipitation: d.precipitation_probability_max[i] ?? 0,
  }));

  const hourKey = c.time.slice(0, 13);
  const idx = Math.max(0, h.time.findIndex((t) => t.startsWith(hourKey)));

  return {
    location,
    current: {
      time: c.time,
      temperature: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
      windDirection: c.wind_direction_10m,
      pressure: c.pressure_msl,
      visibility: h.visibility[idx],
      uvIndex: h.uv_index[idx],
      code: c.weather_code,
      isDay: c.is_day === 1,
      min: d.temperature_2m_min[0],
      max: d.temperature_2m_max[0],
    },
    hourlyNext: hourly.slice(idx, idx + 24),
    hourlyToday: hourly.filter((p) => p.time.startsWith(c.time.slice(0, 10))),
    daily,
  };
}
