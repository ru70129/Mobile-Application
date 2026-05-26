// Simple mock weather service
import WeatherData from '../../models/WeatherData';

export const weatherService = {
  getCurrentWeather: async () => {
    try {
      // Mocked response - replace with real API call if desired
      const mock = new WeatherData({
        temperature: 22,
        condition: 'Partly Cloudy',
        location: 'Local City',
      });

      return { success: true, data: mock };
    } catch (err) {
      return { success: false, error: 'Failed to load weather' };
    }
  },
};

export default weatherService;

