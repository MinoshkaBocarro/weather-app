import { createNewWeather, searchCity } from './weather-handler';

// error handler
function handleError(fn) {
  return (...params) => {
    fn(...params).catch((err) => {
      console.error('Alert!', err);
    });
  };
}

const form = document.querySelector('form');
const dropDown = document.querySelector('.drop-down');

async function selectCityUH(e) {
  const cityName = e.target.dataset.country;
  await createNewWeather(cityName);
  populateApp();
  dropDown.replaceChildren();
  form.reset();
}

const selectCity = handleError(selectCityUH);

function showCityDropdown(cities) {
  cities.forEach((city) => {
    const cityListItem = document.createElement('li');
    cityListItem.textContent = `${city.region}, ${city.country}`;
    cityListItem.dataset.country = `${city.country}`;
    cityListItem.addEventListener('click', selectCity);
    dropDown.append(cityListItem);
  });
}

const formSubmit = document.querySelector('form button');

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  new FormData(form);
});

async function processFormUH(e) {
  e.preventDefault();
  const cityName = e.formData.get('city');
  const searchResult = await searchCity(cityName);
  if (searchResult === 'One city') {
    createNewWeather(cityName);
    form.reset();
  } else {
    showCityDropdown(searchResult);
  }
}

const processForm = handleError(processFormUH);

form.addEventListener('formdata', processForm);

createNewWeather('melbourne').then(() => {
  populateApp();
});
