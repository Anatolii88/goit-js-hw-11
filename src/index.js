import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewApiService from './api-service';

// Экземпляр класса NewApiService
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
async function onSearch(e) {
  try {
  e.preventDefault()
    galleryEl.innerHTML = "";
    loadMoreEl.classList.remove('is-hidden');
  newApiService.page = 1;
  newApiService.query = e.currentTarget.elements.searchQuery.value;
  if (newApiService.query.trim() === '') {
    return
  } else { 
  const articles =  await newApiService.fetchArticles()
     renderPhoto(articles)
    const totalHits = articles.data.totalHits
    if (totalHits) { 
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    
  }
  } catch { 
    console.log(error)
  }
  
 }

// Функция создает разметку
function renderPhoto(articles) { 
  
  if (articles.data.hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  } else { 
const createCard = articles.data.hits.map((item) => { 
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
    if (articles.data.hits.length < 40) {
     loadMoreEl.classList.remove('is-hidden');
     Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results`);
   } else { 
     loadMoreEl.classList.add('is-hidden');
   }
  }
  
}

// Функция догружает статьи на страницу , при нажатии  на кнопку "Load more"
async function onLoadMore() { 
  try {
newApiService.page += 1;
  const articles =  await newApiService.fetchArticles()
    renderPhoto(articles);
    window.scrollBy({
  top: 600,
  behavior: "smooth",
});
  } catch { 
    console.log(error)
  }
}
