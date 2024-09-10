import { Weather } from './components';
import { checkCity, getWeather } from './processing';

const weatherList = [];

async function createNewWeather(city) {
  weatherList.pop();
  const { current, forecast, hourly, location } = await getWeather(city);
  const newWeatherComponent = new Weather({
    current,
    forecast,
    hourly,
    location,
  });
  weatherList.push(newWeatherComponent);
  localStorage.setItem('weatherList', JSON.stringify(weatherList));
}

async function searchCity(city) {
  const { numOfCities, cities } = await checkCity(city);
  if (numOfCities > 1) {
    return cities;
  }
  return 'One city';
}

export { createNewWeather, searchCity, weatherList };
