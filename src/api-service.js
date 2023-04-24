import axios from 'axios';

const API_KEY = '35605556-d9fb3024a448e4d85773bc0e5';
const url = 'https://pixabay.com/api/';
const options = {
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,

  }
}

export default class NewApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }
 async  fetchArticles() { 
const response = await  axios.get(`${url}?q=${this.query}&key=${API_KEY}&per_page=40&page=${this.page}`, options)
    return response 
  }
}