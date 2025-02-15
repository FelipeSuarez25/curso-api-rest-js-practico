window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
  console.log({ location });

  if(location.hash.startsWith('#trens')){
    trendsPage();
  }else if(location.hash.startsWith('#search=')){
    searchPage();
  }else if(location.hash.startsWith('#movie=')){
    movieDetailPage();
  }else if(location.hash.startsWith('#category=')){
    categoryPage();
  }else{
    homePage();
  }
}

function homePage(){
  console.log('HOME!!!');
  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();
}

function searchPage(){
  console.log('SEARCH!!!');
}

function movieDetailPage(){
  console.log('MOVIE!!!');
}

function categoryPage(){
  console.log('CATEGORY!!!');
}

function trendsPage(){
  console.log('TRENDS!!!');
}