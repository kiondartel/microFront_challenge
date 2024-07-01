enum Route {
  Videos = "videos",
  Favorites = "favorites.html",
}

const Styles = {
  width: "100%",
  height: "100%",
  border: "none",
};

function createIframeHTML(
  src: string,
  styles: { width: string; height: string; border: string }
): string {
  return `<iframe src="${src}" style="width: ${styles.width}; height: ${styles.height}; border: ${styles.border};"></iframe>`;
}
function updateFavoritesCount() {
  fetch("http://localhost:3003/favorites")
    .then((response) => response.json())
    .then((data) => {
      const favoritesCount = document.getElementById("favoritesCount");
      if (favoritesCount) {
        favoritesCount.textContent = `(${data.length})`;
      }
    })
    .catch((error) => console.error("Error fetching favorites:", error));
}

const Router = {
  changeURL: function (url: string) {
    window.history.pushState(null, "", url);
  },

  setupNavigation: function () {
    const videosLink = document.getElementById("videosLink");
    const favoritesLink = document.getElementById("favoritesLink");

    if (videosLink) {
      videosLink.addEventListener("click", function (e) {
        e.preventDefault();
        Router.loadRouteContent(Route.Videos);
        Router.changeURL("/");
      });
    } else {
      console.error("Videos link not found");
    }

    if (favoritesLink) {
      favoritesLink.addEventListener("click", function (e) {
        e.preventDefault();
        Router.loadRouteContent(Route.Favorites);
        Router.changeURL("/favorites.html");
        updateFavoritesCount();
      });
    } else {
      console.error("Favorites link not found");
    }
  },

  loadRouteContent: function (route: Route) {
    const content = document.getElementById("main");

    if (!content) {
      console.error('Element with id "content" not found.');
      return;
    }

    switch (route) {
      case Route.Favorites:
        content.innerHTML = createIframeHTML(
          "http://localhost:3001/favorites.html",
          Styles
        );
        break;
      case Route.Videos:
        content.innerHTML = createIframeHTML("http://localhost:3001", Styles);
        break;
      default:
        console.error(`Unknown route: ${route}`);
    }
  },

  init: function () {
    this.setupNavigation();
    this.loadRouteContent(Route.Videos);
    updateFavoritesCount();
  },
};

document.addEventListener("DOMContentLoaded", function () {
  Router.init();
});
