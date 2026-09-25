"use client";

import { useEffect, useRef } from "react";

/**
 * Anima os filhos para cima/opacidade quando entram na tela.
 * `stagger` aplica um atraso crescente a cada filho direto (para grades).
 */
export default function Reveal({ children, className = "", stagger = false, as: Tag = "div" }) {
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
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${stagger ? "[&.is-visible>*]:[transition-delay:calc(var(--i,0)*90ms)]" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
