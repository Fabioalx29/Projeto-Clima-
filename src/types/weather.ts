export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentConditions {
  time: string; // horário local da cidade (ISO sem fuso)
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number; // metros
  uvIndex: number;
  code: number;
  isDay: boolean;
  min: number;
  max: number;
}

export interface HourlyPoint {
  time: string;
  temperature: number;
  precipitation: number;
  code: number;
  isDay: boolean;
}

export interface DailyPoint {
  date: string;
  min: number;
  max: number;
  code: number;
  precipitation: number;
}

export interface WeatherData {
  location: Location;
  current: CurrentConditions;
  hourlyNext: HourlyPoint[]; // próximas 24h
  hourlyToday: HourlyPoint[]; // 00h–23h do dia atual
  daily: DailyPoint[];
}

export type ErrorKind = 'not_found' | 'api' | 'geolocation' | 'offline';

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; kind: ErrorKind; message: string };

/* ---- Respostas cruas da Open-Meteo ---- */
export interface GeocodingResponse {
  results?: { name: string; country?: string; admin1?: string; latitude: number; longitude: number }[];
}

export interface ForecastResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    is_day: number;
    weather_code: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
    is_day: number[];
    visibility: number[];
    uv_index: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

export interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  countryName?: string;
}
