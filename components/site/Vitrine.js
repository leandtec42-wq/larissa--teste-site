"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import Reveal from "./Reveal";
import InstagramIcon from "./InstagramIcon";

const CLIPES = [
  { src: "/media/vitrine-larissa.mp4", label: "Preparando um pedido" },
  { src: "/media/vitrine-vitrine.mp4", label: "A vitrine de sabores" },
  { src: "/media/vitrine-corte.mp4", label: "Cortando fresquinho" },
  { src: "/media/vitrine-ganache.mp4", label: "Banho de chocolate" },
  { src: "/media/vitrine-entrega.mp4", label: "Pedidos prontos" },
  { src: "/media/vitrine-fome.mp4", label: "Bateu a vontade?" },
];

export default function Vitrine({ instagramLink }) {
  return (
    <section id="vitrine" className="bg-white py-16 text-center md:py-[90px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-[640px]">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Vitrine
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Um gostinho de como tudo acontece</h2>
        </Reveal>

        <Reveal as="div" stagger className="mx-auto grid max-w-[820px] grid-cols-2 gap-3 sm:grid-cols-3">
          {CLIPES.map((c, i) => (
            <VideoTile key={c.src} {...c} i={i} />
          ))}
        </Reveal>

        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2 rounded-full border border-rose-deep px-7 py-4 text-[.95rem] font-semibold text-rose-dark transition-[background,transform] hover:-translate-y-0.5 hover:bg-rose-soft"
        >
          <InstagramIcon size={18} /> Ver meu Instagram
        </a>
      </div>
    </section>
  );
}

function VideoTile({ src, label, i }) {
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef(null);

  function tocar() {
    setTocando(true);
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  }

  return (
    <div style={{ "--i": i }} className="relative aspect-square overflow-hidden rounded-[14px] bg-gradient-to-br from-rose-dark via-rose-deep to-gold">
      <video ref={videoRef} src={tocando ? src : undefined} muted playsInline loop controls={tocando} className="h-full w-full object-cover" />
      {!tocando ? (
        <button
          type="button"
          onClick={tocar}
          aria-label={`Reproduzir vídeo: ${label}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(59,32,38,.22)] text-[.78rem] font-semibold text-white"
        >
          <Play size={22} className="rounded-full bg-white/25 p-3 backdrop-blur-sm" style={{ boxSizing: "content-box" }} />
          <span>{label}</span>
        </button>
      ) : null}
    </div>
  );
}
