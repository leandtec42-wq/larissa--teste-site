"use client";

import { useEffect, useRef } from "react";

/**
 * Anima os filhos quando entram na tela.
 *  - `variant`: "up" | "left" | "right" | "zoom" | "fade"
 *  - `delay`: atraso em ms (para escalonar blocos irmãos)
 *  - `stagger`: cada filho direto entra com atraso crescente (use `--i` no filho)
 */
export default function Reveal({ children, className = "", stagger = false, variant = "up", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-variant={stagger ? undefined : variant}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
    >
      {children}
    </Tag>
  );
}
