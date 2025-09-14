"use client";
import { useRef, useState } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlack, setIsBlack] = useState(false);

  const handleEnded = () => {
    setIsBlack(true);
    setTimeout(() => {
      setIsBlack(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 1000);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onEnded={handleEnded}
        autoPlay
        muted
      >
        <source src="https://raw.githubusercontent.com/BrunoV7/images/main/banner.mp4" type="video/mp4" />

      </video>

      {/* Black overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isBlack ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}
