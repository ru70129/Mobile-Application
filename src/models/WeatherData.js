// Weather data model
export class WeatherData {
  constructor(temperature, condition, location = 'Budapest') {
    this.temperature = temperature;
    this.condition = condition;
    this.location = location;
    this.updatedAt = new Date();
  }

  static fromOpenMeteo(data, location = 'Budapest') {
    const currentWeather = data?.current_weather;

    if (!currentWeather) {
      return new WeatherData(22, 'Clear', location);
    }

    return new WeatherData(
      Math.round(currentWeather.temperature),
      WeatherData.getConditionFromCode(currentWeather.weathercode),
      location
    );
  }

  static getConditionFromCode(code) {
    if ([0, 1].includes(code)) return 'Clear';
    if ([2, 3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy';
    if ([95, 96, 99].includes(code)) return 'Stormy';

    return 'Mild';
  }
}
