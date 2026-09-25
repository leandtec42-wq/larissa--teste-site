"use client";

import { useState } from "react";
import { ZoomIn, X, Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function Depoimentos({ depoimentos }) {
  const [aberto, setAberto] = useState(null); // { foto, legenda } | null

  if (!depoimentos.length) {
    return (
      <section id="depoimentos" className="bg-white py-16 md:py-[90px]">
        <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
          <p className="text-cocoa-soft">Em breve, novos depoimentos por aqui!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="depoimentos" className="bg-white py-16 md:py-[90px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Quem provou, amou
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Depoimentos reais de clientes</h2>
        </Reveal>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {depoimentos.map((d, i) => {
            const legenda = d.autor ? `${d.autor} — ${d.descricao}` : d.descricao;
            const rot = ["-rotate-[1.1deg]", "rotate-[.8deg]", "-rotate-[.5deg]", "rotate-[1deg]"][i % 4];
            return (
              <figure
                key={d.id}
                className={`mb-6 break-inside-avoid ${rot} transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
                  d.foto ? "rounded-[20px] bg-cream p-6 pt-[30px] shadow-sm hover:shadow-[0_18px_40px_rgba(198,116,140,.24)]" : "flex flex-col gap-2.5 rounded-[20px] bg-cream p-[30px_26px_26px] shadow-sm"
                }`}
              >
                {d.foto ? (
                  <button
                    type="button"
                    onClick={() => setAberto({ foto: d.foto, legenda })}
                    className="group relative mb-3.5 block w-full overflow-hidden rounded-xl shadow-sm"
                    aria-label="Ampliar print do depoimento"
                  >
                    <img
                      src={d.foto}
                      alt={`Print de conversa${d.autor ? ` com ${d.autor}` : ""} elogiando os doces da Larissa`}
                      loading="lazy"
                      className="w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-cocoa/70 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      <ZoomIn size={16} />
                    </span>
                  </button>
                ) : (
                  <Quote className="mb-1 text-rose-deep" size={30} fill="currentColor" />
                )}
                <p className="font-display text-[.98rem] italic leading-snug text-cocoa">{d.descricao}</p>
                {d.autor ? <figcaption className="mt-1.5 text-[.82rem] font-semibold text-rose-dark">{d.autor}</figcaption> : null}
              </figure>
            );
          })}
        </div>
      </div>

      {aberto ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(28,18,20,.82)] p-6 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setAberto(null)}
        >
          <button
            type="button"
            onClick={() => setAberto(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/40 bg-white/15 text-white hover:bg-white/25"
          >
            <X size={18} />
          </button>
          <figure className="flex max-h-[86vh] max-w-[min(92vw,480px)] flex-col gap-3.5">
            <img src={aberto.foto} alt={aberto.legenda} className="mx-auto max-h-[70vh] w-auto max-w-full rounded-[20px] shadow-lg" />
            <figcaption className="text-center text-[.92rem] leading-relaxed text-white/90">{aberto.legenda}</figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
