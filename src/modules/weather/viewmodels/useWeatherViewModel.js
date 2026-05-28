import { useCallback, useEffect, useState } from 'react';
import { weatherService } from '../services/weatherService';

export const useWeatherViewModel = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await weatherService.getCurrentWeather();

    setWeather(result.data);
    setError(result.success ? null : result.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    loading,
    error,
    fetchWeather,
  };
};
