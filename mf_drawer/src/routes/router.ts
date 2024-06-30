enum Route {
  Videos = "videos",
  Favorites = "favorites.html",
}

const Styles = {
  width: "100%",
  height: "100vh",
  border: "none",
};

function createIframeHTML(
  src: string,
  styles: { width: string; height: string; border: string }
): string {
  return `<iframe src="${src}" style="width: ${styles.width}; height: ${styles.height}; border: ${styles.border};"></iframe>`;
}

const Router = {
  setupNavigation: function () {
    const videosLink = document.getElementById("videosLink");
    const favoritesLink = document.getElementById("favoritesLink");

    if (videosLink) {
      videosLink.addEventListener("click", function (e) {
        e.preventDefault();
        Router.loadRouteContent(Route.Videos);
      });
    } else {
      console.error("Videos link not found");
    }

    if (favoritesLink) {
      favoritesLink.addEventListener("click", function (e) {
        e.preventDefault();
        Router.loadRouteContent(Route.Favorites);
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
  },
};

document.addEventListener("DOMContentLoaded", Router.init.bind(Router));
