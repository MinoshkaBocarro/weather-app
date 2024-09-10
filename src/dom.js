import { populateApp } from './app-population';
import { createNewWeather, searchCity } from './weather-handler';

// error handler
function handleError(fn) {
  return (...params) => {
    fn(...params).catch((err) => {
      console.error('Alert!', err);
    });
  };
}

// check local storage
const temperatureScale = document.querySelector('#temperature-toggle');
const temperatureToggle = document.querySelector(
  '#temperature-toggle input[type=checkbox]',
);
if (localStorage.getItem('temperatureScale')) {
  const newScale = JSON.parse(localStorage.getItem('temperatureScale'));
  temperatureScale.dataset.toggle = newScale;
  if (newScale === 'F') {
    temperatureToggle.checked = true;
  }
}
if (localStorage.getItem('weatherList')) {
  const pastWeather = JSON.parse(localStorage.getItem('weatherList'));
  const preferredLocation = pastWeather[0].location;
  const preferredCity = `${preferredLocation.cityName} ${preferredLocation.region} ${preferredLocation.country}`;
  createNewWeather(preferredCity).then(() => {
    populateApp();
  });
} else {
  createNewWeather('Melbourne').then(() => {
    populateApp();
  });
}

// search bar
const form = document.querySelector('form');
const dropDown = document.querySelector('.drop-down');

async function selectCityUH(e) {
  const cityName = e.target.dataset.city;
  await createNewWeather(cityName);
  populateApp();
  dropDown.replaceChildren();
  form.reset();
}

const selectCity = handleError(selectCityUH);

function showCityDropdown(cities) {
  cities.forEach((city) => {
    const cityListItem = document.createElement('li');
    cityListItem.textContent = `${city.name}, ${city.region}, ${city.country}`;
    cityListItem.dataset.city = `${city.url}`;
    cityListItem.addEventListener('click', selectCity);
    dropDown.append(cityListItem);
  });
}

const formSubmit = document.querySelector('form button');

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  dropDown.replaceChildren();
  new FormData(form);
});

async function processFormUH(e) {
  e.preventDefault();
  const cityName = e.formData.get('city');
  const searchResult = await searchCity(cityName);
  if (searchResult === 'One city') {
    await createNewWeather(cityName);
    populateApp();
    form.reset();
  } else {
    showCityDropdown(searchResult);
  }
}

const processForm = handleError(processFormUH);

form.addEventListener('formdata', processForm);

// temperature toggle
function changeAllTemp(tempScale) {
  const tempArr = document.querySelectorAll('.temperature');
  tempArr.forEach((temp) => {
    const currentTemp = temp;
    if (tempScale === 'C') {
      currentTemp.textContent = temp.dataset.c;
    } else {
      currentTemp.textContent = temp.dataset.f;
    }
  });
}

function setTempScale(tempScale) {
  localStorage.setItem('temperatureScale', JSON.stringify(tempScale));
}

temperatureToggle.addEventListener('click', () => {
  if (temperatureToggle.checked) {
    changeAllTemp('F');
    temperatureToggle.dataset.toggle = 'F';
    setTempScale('F');
  } else {
    changeAllTemp('C');
    temperatureToggle.dataset.toggle = 'C';
    setTempScale('C');
  }
});
