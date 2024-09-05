async function getSearchData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=9ea3c9171bb546949bc230337241406&q=${city}`,
    { mode: 'cors' },
  );
  const json = await response.json();
  return json;
}

async function getWeatherData(city) {
  console.log(
    `https://api.weatherapi.com/v1/forecast.json?key=9ea3c9171bb546949bc230337241406&q=${city}&days=3&aqi=yes&alerts=yes`,
  );
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9ea3c9171bb546949bc230337241406&q=${city}&days=3&aqi=yes&alerts=yes`,
    { mode: 'cors' },
  );
  const json = await response.json();
  return json;
}

export { getSearchData, getWeatherData };
