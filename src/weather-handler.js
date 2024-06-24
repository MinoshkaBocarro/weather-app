import { Weather } from './components';
import { checkCity, getWeather } from './processing';

function handleError(fn) {
  return (...params) => {
    fn(...params).catch((err) => {
      console.error('Alert!', err);
    });
  };
}

const weatherList = [];

async function createNewWeather(city) {
  const { current, forecast, hourly, location } = await getWeather(city);
  const newWeatherComponent = new Weather({
    current,
    forecast,
    hourly,
    location,
  });
  weatherList.push(newWeatherComponent);
  console.log(weatherList);
}

const createNewWeatherH = handleError(createNewWeather);

async function searchCity(city) {
  const { numOfCities, cities } = await checkCity(city);
  console.log(numOfCities);
  if (numOfCities > 1) {
    console.log(cities);
    // call on dom here to show city options
  } else {
    createNewWeatherH(city);
  }
}

const searchCityH = handleError(searchCity);
