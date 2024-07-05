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
  conditionIconPlacard.append(conditionIcon);

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
    conditionIconPlacard.append(conditionIcon);

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
    conditionIconPlacard.append(conditionIcon);

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

function populateApp() {
  const currentCity = weatherList[0];

  const cityPlacard = document.getElementById('city');
  cityPlacard.textContent = currentCity.location.cityName;

  populateCurrent(currentCity.current);

  populateHourly(currentCity.hourly);

  populateForecast(currentCity.forecast);
}

export { populateApp };
