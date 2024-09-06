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

// to do: store toggle value

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

createNewWeather('Melbourne').then(() => {
  populateApp();
});
