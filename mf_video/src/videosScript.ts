// types.ts - Tipos personalizados para uma melhor clareza e reuso
type VideoItem = {
  id: { videoId: string };
  snippet: { title: string };
};

// api.ts - Funções relacionadas à API
const apiKey = "";

async function fetchVideos(
  query: string,
  maxResults: number = 10
): Promise<VideoItem[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`YouTube API Error: ${data.error.message}`);
  }
  return data.items;
}

function showFavoriteNotification(message: string) {
  const notification = document.createElement("div");
  notification.className = "favorite-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 10000);
}

async function addOrRemoveFavorite(videoId: string, videoTitle: string) {
  const favoriteExists = await fetch(`http://localhost:3003/favorites`)
    .then((res) => res.json())
    .then((data) => data.some((v: { id: string }) => v.id === videoId));

  const method = favoriteExists ? "DELETE" : "POST";
  const message = favoriteExists
    ? "Vídeo removido dos favoritos com sucesso!"
    : "Vídeo favoritado com sucesso!";

  try {
    const response = await fetch("http://localhost:3003/favorites", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: videoId, title: videoTitle }),
    });
    const favorites = await response.json();
    if (response.ok) {
      showFavoriteNotification(message);
    } else {
      console.error("Falha ao alternar favorito:", favorites.error);
    }
  } catch (error) {
    console.error("Falha ao alternar favorito:", error);
  }
}

function showVideos(videos: VideoItem[], videosContainer: HTMLElement) {
  videosContainer.innerHTML = "";
  videos.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.className = "video";
    videoElement.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
      <button class="heart-button">Favoritar</button>
    `;

    const favoriteButton = videoElement.querySelector(".heart-button");
    if (favoriteButton) {
      favoriteButton.addEventListener("click", () => {
        addOrRemoveFavorite(
          video.id.videoId,
          video.snippet.title.replace(/'/g, "\\'")
        );
      });
    }

    videosContainer.appendChild(videoElement);
  });
}
document.addEventListener("DOMContentLoaded", async function () {
  const searchButton = document.getElementById("searchButton") as HTMLElement;
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const videosContainer = document.getElementById("videos") as HTMLElement;

  try {
    const initialVideos = await fetchVideos("");
    showVideos(initialVideos, videosContainer);
  } catch (error) {
    console.error("Failed to load initial videos:", error);
  }

  searchButton?.addEventListener("click", async () => {
    try {
      const videos = await fetchVideos(searchInput.value);
      showVideos(videos, videosContainer);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  });
});
