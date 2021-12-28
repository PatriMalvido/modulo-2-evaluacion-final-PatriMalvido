'use strict';

console.log('>> Ready :)');

const animeList = document.querySelector('.js-anime_list');
const searchInputTitle = document.querySelector('.js-search_input_title');
const buttonSearch = document.querySelector('.js-button_search');
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let data = [];

function fetchItems() {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${searchInputTitle.value}`)
    .then((response) => response.json())
    .then((dataFromApi) => {
      data = dataFromApi.results;
      console.log(defaultImage);
      renderAllItems();
    });
}
function renderAllItems() {
  animeList.innerHTML = '';
  for (const eachAnime of data) {
    renderItem(eachAnime);
  }
}

function renderItem(data) {
  if (data.image_url === null) {
    animeList.innerHTML += `
        <article class="movie">
            <img class="" src="${defaultImage}" alt="" placeholder="">
            <h3 class="card__title">${data.title}</h3>
        </article>`;
  } else {
    animeList.innerHTML += `
        <article class="movie">
        <img class="" src="${data.image_url}" alt="" placeholder="">
        <h3 class="card__title">${data.title}</h3>
    </article> `;
  }
}

function handleShowTitle(event) {
  event.preventDefault();
  fetchItems();
}

buttonSearch.addEventListener('click', handleShowTitle);
