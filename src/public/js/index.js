const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const movieListReleases = document.getElementById("list-movies-realeses")
const featuredContent = document.querySelector(".featured-content")
const container = document.querySelector(".container")


arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
        }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});


let prevScrollpos = window.pageYOffset;
const navbar = document.getElementById("navbar");
const navbarHeight = navbar.offsetHeight;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // Muestra la barra de navegación al desplazarse hacia arriba
    navbar.style.top = "0";
  } else {
    // Oculta la barra de navegación al desplazarse hacia abajo
    navbar.style.top = `-${navbarHeight}px`;
  }
  prevScrollpos = currentScrollPos;
}

// renderMoviesReleases()



function backTab() {
  history.forward()
}


async function getJsonData(url) {
  const req = await fetch(url)
  const data = await req.json()
  return data
}



const moviesIds = []
  // Set interval to change background image
  const changeHeroBackground = async () => {
    const movies = await getJsonData("/movies");
    movies.map(movie=>moviesIds.push(movie.id));
    const idrandom = Math.ceil(Math.random()*movies.length);
    const movieIdSelected = moviesIds[idrandom-1];
    var movie = await getJsonData("/movies/find?id="+movieIdSelected);
    const imgs = await getJsonData("/movies/imgs?id="+movieIdSelected);;
    const imgsLen = imgs.length;
    const random = Math.ceil(Math.random()*imgsLen);

    const urlImg = imgs[random-1].url_img;
    featuredContent.style.background = `
      
    linear-gradient(to bottom, rgba(0, 0, 0, 0), #151515),
      url(${urlImg}) no-repeat center / 1500px 600px`;
      const {descripcion,titulo,id} = movie[0];
      changeDataHero(id,titulo, descripcion);
  };
    // changeDataHero(titulo,descripcion)
  // Set intervals

changeHeroBackground()

changeColorNav()


function changeColorNav() {
  const menuItems = document.getElementsByClassName("menu-list-item")

  const path = location.pathname
  const spltPath = path.split("/")
  const page = spltPath[2]

  for (const item of menuItems) {
    const itemTxtCnt = item.textContent;
    const lowerItem = itemTxtCnt.toLowerCase()
    if (lowerItem === page) item.classList.add("active")
    
  }
}

function changeDataHero(movieId,tit,descp){
  const movieTitle = document.querySelector("#featured-title");
  const movieDesc = document.querySelector("#featured-desc");
  const btnView = document.querySelector(".featured-button");
  btnView.setAttribute("href","/movies/view?movieid="+movieId);
  movieTitle.innerHTML = tit
  movieDesc.innerHTML = descp
}