const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "aplication/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

const URL_IMAGE = "https://image.tmdb.org/t/p/w300";

//utils
function createMovies(movies, container) {
  container.innerHTML = "";

  const movieContainer = movies
    .map(
      (movie) =>
        `<div class="movie-container">
      <img class="movie-img" src="${URL_IMAGE}${movie.poster_path}" alt="${movie.title}" />
    </div>`
    )
    .join("");

  container.innerHTML = movieContainer;

  // Seleccionar todos los divs generados después de insertarlos en el DOM
  const movieContainers = container.querySelectorAll(".movie-container");

  // Asignar eventos después de crear los elementos
  movieContainers.forEach((movieDiv, index) => {
    const movie = movies[index]; // Obtener la película correspondiente
    //console.log("Película asociada:", movie); // Depuración

    movieDiv.addEventListener("click", () => {
      //console.log("Película clickeada:", movie.id); // Para verificar
      location.hash = `#movie=${movie.id}`;
    });
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  const categoryContainer = categories
    .map(
      (category) =>
        `<div class="category-container">
      <h3 id="id${category.id}" class="category-title">${category.name}</h3>
     </div>`
    )
    .join("");

  container.innerHTML = categoryContainer;
}

//llamados API

async function getTrendingMoviesPreview() {
  const { data } = await api(`trending/movie/day`);

  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesMoviesPreview() {
  const { data } = await api(`genre/movie/list`);

  const categories = data.genres;

  //funcion
  createCategories(categories, categoriesPreviewList);

  // Agregar evento click a cada h3 después de insertarlo en el DOM
  categoryTitle = document.querySelectorAll(".category-title");

  // Recorrer cada h3 y agregar el evento click
  categoryTitle.forEach((h3) => {
    h3.addEventListener("click", (event) => {
      const categoryId = event.target.id.replace("id", ""); // Extraer solo el número
      const categoryName = event.target.textContent.trim().replace(/\s+/g, "-"); // Convertir espacios en guiones

      if (categoryId) {
        location.hash = `#category=${categoryId}-${categoryName}`;
      } else {
        console.error("Error: No se pudo obtener el ID de la categoría.");
      } // Cambiar la URL hash
    });
  });
}

async function getMoviesByCateogry(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api(`trending/movie/day`);

  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api(`movie/`+id);

  const movieImgUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  headerSection.style.background = ` 
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
}
