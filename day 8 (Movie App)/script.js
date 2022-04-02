const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7c9ecfa59b603de41e05b1c521c9c5e6&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
    'https://api.themoviedb.org/3/search/movie?api_key=7c9ecfa59b603de41e05b1c521c9c5e6&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
//Get initial movies
getMovie(API_URL);
async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMG_PATH+poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClaassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    });
}

function getClaassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== "") {
        getMovie(SEARCH_URL + searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});