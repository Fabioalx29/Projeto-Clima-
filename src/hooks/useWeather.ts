import { useCallback, useRef, useState } from 'react';
import { AppError, fetchWeather, geocodeCity, reverseGeocode } from '../services/weatherApi';
import type { WeatherData, WeatherState } from '../types/weather';
import { useRecentSearches } from './useRecentSearches';

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new AppError('geolocation', 'Seu navegador não suporta geolocalização.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => {
      const message = err.code === err.PERMISSION_DENIED
        ? 'Permissão de localização negada. Libere o acesso no navegador ou pesquise uma cidade.'
        : 'Não foi possível obter sua localização.';
      reject(new AppError('geolocation', message));
    }, { timeout: 10000 });
  });
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({ status: 'idle' });
  const recent = useRecentSearches();
  const requestId = useRef(0);
  const { add } = recent;

  const run = useCallback(async (task: () => Promise<WeatherData>) => {
    const id = ++requestId.current;
    setState({ status: 'loading' });
    try {
      const data = await task();
      if (id !== requestId.current) return; // resposta antiga
      setState({ status: 'success', data });
      add(data.location.name);
    } catch (err) {
      if (id !== requestId.current) return;
      const e = err instanceof AppError ? err : new AppError('api', 'Algo deu errado. Tente novamente.');
      setState({ status: 'error', kind: e.kind, message: e.message });
    }
  }, [add]);

  const searchCity = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    void run(async () => fetchWeather(await geocodeCity(q)));
  }, [run]);

  const locate = useCallback(() => {
    void run(async () => {
      const { coords } = await getPosition();
      return fetchWeather(await reverseGeocode(coords.latitude, coords.longitude));
    });
  }, [run]);

  return { state, searchCity, locate, recent };
}
