import { findGif } from './gif-search';
import { weatherList } from './weather-handler';

function checkTemperatureToggle() {
  const temperatureSetting = document.getElementById('temperature-toggle');
  if (temperatureSetting.dataset.toggle === 'C') {
    return true;
  }
  return false;
}

function populateCurrent(currentWeather) {
  const current = document.getElementById('current');
  const conditionTextPlacard = current.querySelector('.condition-text');
  conditionTextPlacard.textContent = currentWeather.conditionText;

  const temperaturePlacard = current.querySelector('.temperature');
  if (checkTemperatureToggle()) {
    temperaturePlacard.textContent = `${currentWeather.tempC}°C`;
  } else {
    temperaturePlacard.textContent = `${currentWeather.tempF}°F`;
  }

  const conditionIconPlacard = current.querySelector('.condition-icon');
  const conditionIcon = document.createElement('img');
  conditionIcon.src = currentWeather.conditionIcon;
  conditionIcon.alt = currentWeather.conditionText;
  conditionIconPlacard.replaceChildren(conditionIcon);

  const airQualityPlacard = current.querySelector('.air-quality');
  airQualityPlacard.textContent = currentWeather.airQuality;

  const humidityPlacard = current.querySelector('.humidity');
  humidityPlacard.textContent = currentWeather.humidity;

  const uvPlacard = current.querySelector('.uv');
  uvPlacard.textContent = currentWeather.uv;
}

function populateHourly(weather) {
  const hours = document.querySelectorAll('.hour');

  hours.forEach((hour, index) => {
    const hourWeather = weather[index];

    const timePlacard = hour.querySelector('.time');
    timePlacard.textContent = hourWeather.hour;

    const conditionIconPlacard = hour.querySelector('.condition-icon');
    const conditionIcon = document.createElement('img');
    conditionIcon.src = hourWeather.conditionIcon;
    conditionIcon.alt = hourWeather.conditionText;
    conditionIconPlacard.replaceChildren(conditionIcon);

    const temperaturePlacard = hour.querySelector('.temperature');
    if (checkTemperatureToggle()) {
      temperaturePlacard.textContent = `${hourWeather.tempC}°C`;
    } else {
      temperaturePlacard.textContent = `${hourWeather.tempF}°F`;
    }

    const precipitationPlacard = hour.querySelector('.precipitation');
    if (hourWeather.precipitation !== 0) {
      precipitationPlacard.textContent = `${hourWeather.precipitation}%`;
    }
  });
}

function populateForecast(weather) {
  const forecast = document.getElementById('forecast');
  const days = forecast.querySelectorAll('.day');

  days.forEach((day, index) => {
    const dayWeather = weather[index];

    const conditionIconPlacard = day.querySelector('.condition-icon');
    const conditionIcon = document.createElement('img');
    conditionIcon.src = dayWeather.conditionIcon;
    conditionIcon.alt = dayWeather.conditionText;
    conditionIconPlacard.replaceChildren(conditionIcon);

    const temperatureMaxPlacard = day.querySelector('.temperature-max');
    if (checkTemperatureToggle()) {
      temperatureMaxPlacard.textContent = `${dayWeather.maxTempC}°C`;
    } else {
      temperatureMaxPlacard.textContent = `${dayWeather.maxTempF}°F`;
    }

    const temperatureMinPlacard = day.querySelector('.temperature-min');
    if (checkTemperatureToggle()) {
      temperatureMinPlacard.textContent = `${dayWeather.minTempC}°C`;
    } else {
      temperatureMinPlacard.textContent = `${dayWeather.minTempF}°F`;
    }

    const precipitationPlacard = day.querySelector('.precipitation');
    if (dayWeather.precipitation !== 0) {
      precipitationPlacard.textContent = `${dayWeather.precipitation}%`;
    }
  });
}

async function populateBackground(code, day) {
  const background = document.querySelector('body');
  const gifId = findGif(code, day);
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/${gifId}?api_key=R9KqVBSJVlfoC24CoIs1yT42ktFO8ptH&rating=g`,
      { mode: 'cors' },
    );

    const dataInfo = await response.json();

    if (dataInfo.data.length === 0) {
      throw new Error('No gifs found');
    } else {
      const gif = dataInfo.data.images.original.url;
      background.style.cssText = `background:center / cover no-repeat rgb(157, 245, 255) url("${gif}");`;
    }
  } catch (error) {
    console.log(error);
    background.style.cssText = 'background-color: rgb(157, 245, 255);';
  }
}

function populateApp() {
  const currentCity = weatherList[0];

  const cityPlacard = document.querySelector('.city');
  cityPlacard.textContent = currentCity.location.cityName;

  populateBackground(
    currentCity.current.conditionCode.toString(),
    currentCity.current.isDay.toString(),
  );

  populateCurrent(currentCity.current);

  populateHourly(currentCity.hourly);

  populateForecast(currentCity.forecast);
}

export { populateApp };
