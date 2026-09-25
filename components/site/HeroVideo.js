"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({ src, poster }) {
  const mediaRef = useRef(null);

  useEffect(() => {
    const media = mediaRef.current;
    const hero = document.getElementById("topo");
    if (!media || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 640px)").matches) return;

    let ticking = false;
    function update() {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
      media.style.transform = `scale(${1 + progress * 0.09})`;
      ticking = false;
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={mediaRef} className="absolute inset-0 z-0 origin-[center_30%] will-change-transform">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover object-[50%_25%]"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,32,38,.35) 0%, rgba(59,32,38,.28) 35%, rgba(38,22,26,.78) 100%), linear-gradient(90deg, rgba(59,32,38,.55) 0%, rgba(59,32,38,.05) 55%)",
        }}
      />
    </div>
  );
}
