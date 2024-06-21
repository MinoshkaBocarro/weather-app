async function getSearchDataUnhandled(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=9ea3c9171bb546949bc230337241406&q=${city}`,
    { mode: 'cors' },
  );
  const json = await response.json();
  return json;
}

async function getCurrentWeatherDataUnhandled(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=9ea3c9171bb546949bc230337241406&q=${city}&aqi=yes`,
    { mode: 'cors' },
  );
  const json = await response.json();
  return json;
}

async function getForecastWeatherDataUnhandled(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9ea3c9171bb546949bc230337241406&q=${city}&days=3&aqi=yes&alerts=yes`,
    { mode: 'cors' },
  );
  const json = await response.json();
  return json;
}

function handleError(fn) {
  return (...params) => {
    fn(...params).catch((err) => {
      console.error('Alert!', err);
    });
  };
}

const getSearchData = handleError(getSearchDataUnhandled);
const getCurrentWeatherData = handleError(getCurrentWeatherDataUnhandled);
const getForecastWeatherData = handleError(getForecastWeatherDataUnhandled);

export { getSearchData, getCurrentWeatherData, getForecastWeatherData };
