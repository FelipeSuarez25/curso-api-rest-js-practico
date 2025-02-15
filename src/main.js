const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers:{
    'Content-Type': 'aplication/json;charset=utf-8'
  },
  params:{
    'api_key': API_KEY,
  }
});

const URL_IMAGE = "https://image.tmdb.org/t/p/w300";

async function getTrendingMoviesPreview() {
  const { data } = await api(`trending/movie/day`);

  const movies = data.results;

  const trendingPreviewMovieList = document.querySelector(".trendingPreview-movieList");

  // Generamos el HTML correctamente
  const movieContainer = movies.map(movie => 
    `<div class="movie-container">
      <img class="movie-img" src="${URL_IMAGE}${movie.poster_path}" alt="${movie.title}" />
    </div>`
  ).join("");  // Importante: usar join("") para convertir el array en una string

  trendingPreviewMovieList.innerHTML = movieContainer;
}

async function getCategoriesMoviesPreview() {
  const { data } = await api(`genre/movie/list`);

  const categories = data.genres;

  const categoriesPreviewList = document.querySelector(".categoriesPreview-list");

  // Generamos el HTML correctamente
  const categoryContainer = categories.map(category => 
    `<div class="category-container">
      <h3 id="id${category.id}" class="category-title">${category.name}</h3>
     </div>`
  ).join("");  // Importante: usar join("") para convertir el array en una string

  categoriesPreviewList.innerHTML = categoryContainer;
}

getTrendingMoviesPreview();
getCategoriesMoviesPreview();