"use client";

import { useEffect, useRef } from "react";

/**
 * Desloca o conteúdo verticalmente conforme a rolagem, criando profundidade.
 * `speed` positivo sobe mais devagar que a página; negativo sobe mais rápido.
 * Desligado para quem prefere menos movimento e em telas pequenas.
 */
export default function Parallax({ children, speed = 0.12, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 768px)");

    let ticking = false;
    function update() {
      ticking = false;
      if (!desktop.matches) {
        el.style.transform = "";
        return;
      }
      const rect = el.parentElement.getBoundingClientRect();
      const centro = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centro * speed).toFixed(1)}px, 0)`;
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
