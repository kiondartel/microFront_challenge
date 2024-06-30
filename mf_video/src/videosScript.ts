// types.ts - Tipos personalizados para uma melhor clareza e reuso
type VideoItem = {
  id: { videoId: string };
  snippet: { title: string };
};

// api.ts - Funções relacionadas à API
const apiKey = "AIzaSyC7An8yoXEhpo3rWzp7K5_w2W-mId-eUo0";

async function fetchVideos(
  query: string,
  maxResults: number = 8
): Promise<VideoItem[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`YouTube API Error: ${data.error.message}`);
  }
  return data.items;
}

async function addFavorite(videoId: string, videoTitle: string) {
  try {
    const response = await fetch("http://localhost:3003/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: videoId, title: videoTitle }),
    });
    const favorites = await response.json();
    console.log("Favorites updated:", favorites);
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
  }
}

export function showVideos(videos: VideoItem[], videosContainer: HTMLElement) {
  videosContainer.innerHTML = "";
  videos.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.className = "video";
    videoElement.innerHTML = `
      <h3>${video.snippet.title}</h3>
      <iframe src="https://www.youtube.com/embed/${
        video.id.videoId
      }" frameborder="0" allowfullscreen></iframe>
      <button class="heart-button" onclick="addFavorite('${
        video.id.videoId
      }', '${video.snippet.title.replace(/'/g, "\\'")}')">Favoritar</button>
    `;
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
