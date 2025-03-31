import { useRef, useState } from "react";

export default function VideoRef() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  function handlePlayClick() {
    setPlay((prev) => !prev);
    play ? videoRef.current?.pause() : videoRef.current?.play();
  }

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={handlePlayClick}
        style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
      >
        {play ? "Pause" : "Play"}
      </button>
      <video width="250" ref={videoRef} loop>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}
