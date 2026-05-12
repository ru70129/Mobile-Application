import axios from 'axios';
import { WeatherData } from '../../models/WeatherData';

const BUDAPEST_COORDINATES = {
  latitude: 47.4979,
  longitude: 19.0402,
  location: 'Budapest',
};

export const weatherService = {
  async getCurrentWeather(options = BUDAPEST_COORDINATES) {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: options.latitude,
          longitude: options.longitude,
          current_weather: true,
          timezone: 'auto',
        },
        timeout: 5000,
      });

      return {
        success: true,
        data: WeatherData.fromOpenMeteo(response.data, options.location),
      };
    } catch (error) {
      return {
        success: false,
        error: 'Unable to load live weather. Showing mock weather.',
        data: new WeatherData(22, 'Clear', options.location),
      };
    }
  },
};
