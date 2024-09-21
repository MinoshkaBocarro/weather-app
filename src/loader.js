const loaderPlaceholder = document.querySelector('.loader');

function addLoader() {
  loaderPlaceholder.classList.add('show');
}

function removeLoader() {
  loaderPlaceholder.classList.remove('show');
}

export { addLoader, removeLoader };
