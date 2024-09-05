import { getSearchData, getWeatherData } from './data';
import {
  extractCurrentData,
  extractForecastData,
  extractLocationData,
} from './data-extraction';

async function checkCity(city) {
  const cityArr = await getSearchData(city);
  const numOfCities = cityArr.length;
  const cities = cityArr.map((city) => ({
    name: city.name,
    region: city.region,
    country: city.country,
    url: city.url,
  }));
  return { numOfCities, cities };
}

async function getWeather(city) {
  const dataArr = await getWeatherData(city);
  console.log(dataArr);
  const location = extractLocationData(dataArr);
  const current = extractCurrentData(dataArr);
  const { forecast, hourly } = extractForecastData(dataArr, location.time);
  return { current, location, forecast, hourly };
}

export { checkCity, getWeather };
