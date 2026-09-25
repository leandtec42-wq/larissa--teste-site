"use client";

import { useEffect, useState } from "react";
import { ZoomIn, X, Quote } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const INCLINACOES = ["-rotate-[1.2deg]", "rotate-[1deg]", "-rotate-[.6deg]", "rotate-[1.3deg]"];

export default function Depoimentos({ depoimentos }) {
  const [aberto, setAberto] = useState(null); // { foto, legenda } | null

  // Lightbox: Esc fecha e a página de trás não rola.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setAberto(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  if (!depoimentos.length) {
    return (
      <section id="depoimentos" className="bg-vanilla py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
          <p className="text-cocoa-soft">Em breve, novos depoimentos por aqui!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="depoimentos" className="bg-cream px-3 py-6 sm:px-5 md:py-10">
      <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[36px] bg-berry-950 py-20 text-white md:rounded-[56px] md:py-28">
        <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-raspberry/30 blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-honey/20 blur-[100px]" aria-hidden="true" />
        <div className="grain pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
          <SectionHead
            center
            dark
            eyebrow="Quem provou, amou"
            title={<>Depoimentos <span className="italic text-gradient-honey">reais</span> de clientes</>}
            subtitle="Prints de conversa de quem já provou."
          />

          <Reveal as="div" stagger className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {depoimentos.map((d, i) => {
              const legenda = d.autor ? `${d.autor} — ${d.descricao}` : d.descricao;
              return (
                <figure
                  key={d.id}
                  style={{ "--i": i }}
                  className={`mb-6 break-inside-avoid ${INCLINACOES[i % INCLINACOES.length]} rounded-[28px] bg-white p-4 text-cocoa shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_40px_70px_-30px_rgba(214,51,108,.55)]`}
                >
                  {d.foto ? (
                    <button
                      type="button"
                      onClick={() => setAberto({ foto: d.foto, legenda })}
                      className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-cream"
                      aria-label="Ampliar print do depoimento"
                    >
                      <img
                        src={d.foto}
                        alt={`Print de conversa${d.autor ? ` com ${d.autor}` : ""} elogiando os doces da Larissa`}
                        loading="lazy"
                        className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-berry-900/80 text-white opacity-100 backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100">
                        <ZoomIn size={17} />
                      </span>
                    </button>
                  ) : (
                    <Quote className="mb-3 text-raspberry" size={34} fill="currentColor" />
                  )}
                  <blockquote className="font-display px-1 text-[1.02rem] italic leading-snug text-berry-900">{d.descricao}</blockquote>
                  {d.autor ? <figcaption className="mt-2 px-1 text-[.84rem] font-semibold text-raspberry">{d.autor}</figcaption> : null}
                </figure>
              );
            })}
          </Reveal>
        </div>
      </div>

      {aberto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Depoimento ampliado"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-berry-950/90 p-5 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setAberto(null)}
        >
          <button
            type="button"
            onClick={() => setAberto(null)}
            aria-label="Fechar"
            autoFocus
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <X size={20} />
          </button>
          <figure className="flex max-h-[88vh] max-w-[min(92vw,480px)] flex-col gap-4">
            <img src={aberto.foto} alt={aberto.legenda} className="mx-auto max-h-[72vh] w-auto max-w-full rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,.6)]" />
            <figcaption className="text-center text-[.95rem] leading-relaxed text-white/90">{aberto.legenda}</figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
