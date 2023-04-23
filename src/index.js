import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewApiService from './api-service';

const newApiService = new NewApiService()


// Отслеживаем кнопку Load more
const loadMoreEl = document.querySelector('.load-more')
loadMoreEl.addEventListener('click', onLoadMore)
// Отслеживаем галерею
const galleryEl = document.querySelector('.gallery')
// Отслеживаем форму
const form = document.querySelector('.search-form')
form.addEventListener('submit', onSearch)

// Функция при нажатии на поиск
function onSearch(e) {
  e.preventDefault()
  galleryEl.innerHTML=""
  newApiService.page = 1;
  newApiService.query = e.currentTarget.elements.searchQuery.value;
  loadMoreEl.classList.remove('is-hidden')
  if (newApiService.query === '') {
    return
  } else { 
 newApiService.fetchArticles().then(renderPhoto);
  }
  
 }


function renderPhoto(data) { 
  console.log(data.data);
  if (data.data.hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else { 
const createCard = data.data.hits.map((item) => { 
    const card = `<a class="card-link"   href="${item.largeImageURL}"><div class="photo-card">
      <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="335px" height="200px" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b></br>
          <span class="info-item_text">${item.likes}</span>
        </p>
      
        <p class="info-item">
          <b>Views</b></br>
          <span class="info-item_text" >${item.views}</span>
        </p>
        
        <p class="info-item">
          <b>Comments</b></br>
           <span class="info-item_text" >${item.comments}</span>
        </p>
        
        <p class="info-item">
          <b>Downloads</b></br>
          <span class="info-item_text" >${item.downloads}</span>
        </p>
        
      </div>
    </div></a> `
    return card
  }).join('')
    
  galleryEl.insertAdjacentHTML('beforeend', createCard)
  const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
  lightbox.refresh()
  loadMoreEl.classList.add('is-hidden');
  }
  
}

function onLoadMore() { 
  newApiService.page += 1;
  newApiService.fetchArticles().then(renderPhoto);
}
