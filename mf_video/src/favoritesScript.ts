type VideoFavoriteItem = {
  title: any;
  id: { videoId: string };
  snippet: { title: string };
};

async function fetchFavorites(): Promise<VideoFavoriteItem[]> {
  const response = await fetch("http://localhost:3003/favorites");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return data;
}

function showFavorites(favorites: VideoFavoriteItem[], container: HTMLElement) {
  container.innerHTML = "";
  favorites.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.className = "video";
    videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
      `;
    container.appendChild(videoElement);
  });

  const favoritesCountElement = document.getElementById(
    "favoritesCount"
  ) as HTMLElement;
  favoritesCountElement.textContent = `(${favorites.length})`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const favoritesContainer = document.getElementById(
    "favoritesContainer"
  ) as HTMLElement;
  try {
    const favorites = await fetchFavorites();
    showFavorites(favorites, favoritesContainer);
  } catch (error) {
    console.error("Failed to load favorites:", error);
  }
});
