const URL_IMAGE = "https://image.tmdb.org/t/p/w300";
const URL_API = 'https://api.themoviedb.org/3/';

async function getTrendingMoviesPreview() {
  const res = await fetch(`${URL_API}trending/movie/day?api_key=` + API_KEY);
  const data = await res.json();

  const movies = data.results;
  console.log({ data, movies });

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
  const res = await fetch(`${URL_API}genre/movie/list?api_key=` + API_KEY);
  const data = await res.json();

  const categories = data.genres;
  console.log({ data, categories });

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