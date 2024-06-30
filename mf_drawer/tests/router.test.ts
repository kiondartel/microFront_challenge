import "@testing-library/jest-dom";
import { Router } from "../src/routes/router";

describe("Router", () => {
  document.body.innerHTML = `
    <div id="main"></div>
    <a href="#" id="videosLink">Videos</a>
    <a href="#" id="favoritesLink">Favoritos</a>
  `;

  beforeEach(() => {
    Router.init();
  });

  it("deve carregar o conteúdo de vídeo inicialmente", () => {
    const main = document.getElementById("main");
    expect(main.innerHTML).toContain("iframe");
    expect(main.innerHTML).toContain("http://localhost:3001");
  });

  it("deve carregar o conteúdo de favoritos ao clicar no link de favoritos", () => {
    const favoritesLink = document.getElementById("favoritesLink");
    favoritesLink.click();
    const main = document.getElementById("main");
    expect(main.innerHTML).toContain("favorites.html");
  });
});
