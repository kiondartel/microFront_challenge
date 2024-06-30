import "@testing-library/jest-dom";
import { showVideos } from "../videosScript";

describe("showVideos", () => {
  let videosContainer: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `<div id="videos"></div>`;
    videosContainer = document.getElementById("videos") as HTMLElement;
  });

  it("deve limpar o conteúdo anterior e renderizar novos vídeos", () => {
    const videos = [
      { id: { videoId: "video1" }, snippet: { title: "Video 1" } },
      { id: { videoId: "video2" }, snippet: { title: "Video 2" } },
    ];

    showVideos(videos, videosContainer);

    expect(videosContainer).toBeEmptyDOMElement();
    expect(videosContainer.children).toHaveLength(2);
    expect(videosContainer.firstChild).toHaveTextContent("Video 1");
    expect(videosContainer.lastChild).toHaveTextContent("Video 2");
  });
});
