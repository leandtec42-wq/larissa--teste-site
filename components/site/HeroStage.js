"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, Heart, Pause, Play, Sparkles } from "lucide-react";
import SpinBadge from "./SpinBadge";

/**
 * Topo do site: texto à esquerda + carrossel de vídeos verticais.
 *
 * Os vídeos da Larissa são 9:16. Em vez de esticá-los em tela cheia no
 * computador (o que estoura a resolução), cada tela recebe a versão certa:
 *  - celular  (< 1024px): 720x1280, ocupa a tela toda como um "story"
 *  - computador (≥ 1024px): 1080x1920, dentro de um cartão com o fundo
 *    desfocado com as cores do próprio vídeo.
 * Quando um vídeo termina, o próximo começa sozinho.
 */

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => null // no servidor ainda não sabemos: só a capa é renderizada
  );
}

function useAbaVisivel() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => !document.hidden,
    () => true
  );
}

export default function HeroStage({ reels, children }) {
  const total = reels.length;
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const barRefs = useRef([]);
  const falhos = useRef(new Set());
  const toque = useRef(null);

  const [index, setIndex] = useState(0);
  const [escolhaUsuario, setEscolhaUsuario] = useState(null); // null = automático; true = pausou; false = deu play
  const [emTela, setEmTela] = useState(true);

  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduzMovimento = useMediaQuery("(prefers-reduced-motion: reduce)");
  const abaVisivel = useAbaVisivel();

  const modo = desktop === null ? null : desktop ? "desktop" : "mobile";
  const pausado = escolhaUsuario ?? Boolean(reduzMovimento);
  const tocando = !pausado && emTela && abaVisivel && modo !== null;
  const proximo = (index + 1) % total;
  // A capa do vídeo atual já vem no HTML do servidor (rápido para o LCP); o vídeo só carrega
  // no cliente, quando sabemos qual versão (celular/PC) baixar — e só o atual e o próximo.
  const mostrarCapa = (i) => i === index || (modo !== null && i === proximo);
  const carregarVideo = (i) => modo !== null && (i === index || i === proximo);

  // Pausa o carrossel quando o topo sai da tela (economiza bateria e dados).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setEmTela(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ir = useCallback(
    (delta) => {
      setIndex((atual) => {
        let n = atual;
        for (let k = 0; k < total; k++) {
          n = (n + delta + total) % total;
          if (!falhos.current.has(n)) return n;
        }
        return atual;
      });
    },
    [total]
  );

  // Ao trocar de vídeo, o novo começa do início.
  useEffect(() => {
    const v = videoRefs.current[index];
    if (v && v.currentTime > 0) v.currentTime = 0;
  }, [index]);

  // Só o vídeo ativo toca, e só quando deve.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && tocando) {
        const promessa = v.play();
        if (promessa) {
          promessa.catch((erro) => {
            // Economia de energia do iOS/navegador pode barrar o autoplay: mostra o botão de play.
            if (erro?.name === "NotAllowedError") setEscolhaUsuario(true);
          });
        }
      } else {
        v.pause();
      }
    });
  }, [index, tocando, modo]);

  // Barras de progresso (estilo stories): cheias antes do atual, parciais no atual, vazias depois.
  const pintar = useCallback(
    (progresso) => {
      for (let j = 0; j < total; j++) {
        const barra = barRefs.current[j];
        if (barra) barra.style.transform = `scaleX(${j < index ? 1 : j === index ? progresso : 0})`;
      }
    },
    [index, total]
  );

  useEffect(() => {
    const v = videoRefs.current[index];
    const ler = () => (v && v.duration ? Math.min(1, v.currentTime / v.duration) : 0);
    pintar(ler());
    if (!tocando) return;
    let raf;
    const passo = () => {
      pintar(ler());
      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [index, tocando, pintar]);

  function aoErrar(i) {
    falhos.current.add(i);
    if (falhos.current.size < total && i === index) ir(1);
  }

  function aoTocar(e) {
    if (e.pointerType === "mouse") return;
    toque.current = { x: e.clientX, y: e.clientY };
  }
  function aoSoltar(e) {
    const inicio = toque.current;
    toque.current = null;
    if (!inicio) return;
    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) ir(dx < 0 ? 1 : -1);
  }
  function aoTeclar(e) {
    if (e.key === "ArrowRight") ir(1);
    else if (e.key === "ArrowLeft") ir(-1);
  }

  const alternar = () => setEscolhaUsuario(tocando ? true : false);
  const atual = reels[index];

  return (
    <section
      id="topo"
      ref={rootRef}
      onPointerDown={aoTocar}
      onPointerUp={aoSoltar}
      onPointerCancel={() => {
        toque.current = null;
      }}
      className="relative isolate min-h-[100svh] touch-pan-y overflow-hidden bg-berry-950 text-white"
    >
      {/* Fundo (só no computador): capa do vídeo atual desfocada + luzes suaves */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden="true">
        {reels.map((r, i) =>
          mostrarCapa(i) ? (
            <img
              key={r.id}
              src={r.poster}
              alt=""
              className={`absolute inset-0 h-full w-full scale-125 object-cover blur-3xl saturate-150 transition-opacity duration-[1400ms] ${
                i === index ? "opacity-50" : "opacity-0"
              }`}
            />
          ) : null
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-berry-950/70 via-berry-900/50 to-berry-950/85" />
        <div className="animate-blob absolute -left-[12%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(214,51,108,.55),transparent_68%)] blur-2xl" />
        <div className="animate-blob absolute -bottom-[18%] left-[30%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(244,184,96,.32),transparent_68%)] blur-2xl [animation-delay:-8s]" />
        {[
          ["left-[7%] top-[22%]", "0s", 18],
          ["left-[44%] top-[14%]", "1.1s", 12],
          ["left-[38%] bottom-[20%]", "2.2s", 16],
          ["left-[3%] bottom-[30%]", "0.6s", 12],
        ].map(([pos, delay, size]) => (
          <Sparkles key={pos} size={size} style={{ animationDelay: delay }} className={`animate-twinkle absolute text-honey ${pos}`} />
        ))}
        <div className="grain absolute inset-0 opacity-30" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1180px] flex-col justify-end px-5 pb-16 pt-[100px] sm:px-8 lg:grid lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-32">
        <div className="relative z-10">{children}</div>

        {/* Carrossel */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Vídeos da Larissa preparando e entregando as tortas"
          onKeyDown={aoTeclar}
          className="pointer-events-none absolute inset-0 lg:pointer-events-auto lg:relative lg:inset-auto lg:mb-14 lg:w-fit lg:justify-self-center"
        >
          <div className="pointer-events-auto absolute inset-x-0 bottom-0 top-[92px] lg:relative lg:inset-auto lg:h-[min(74svh,720px)] lg:w-[calc(min(74svh,720px)*9/16)]">
            {/* Moldura: recorta os vídeos e dá o acabamento de "celular" */}
            <div className="absolute inset-0 overflow-hidden rounded-t-[28px] bg-berry-900 lg:rounded-[40px] lg:shadow-[0_40px_90px_-20px_rgba(0,0,0,.65),0_0_0_1px_rgba(255,255,255,.14),0_0_0_10px_rgba(255,255,255,.06)]">
              {reels.map((r, i) => {
                const ativo = i === index;
                const ativar = carregarVideo(i);
                return (
                  <div
                    key={r.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} de ${total}: ${r.label}`}
                    aria-hidden={!ativo}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out ${
                      ativo ? "z-[1] scale-100 opacity-100" : "z-0 scale-[1.06] opacity-0"
                    }`}
                  >
                    {mostrarCapa(i) ? (
                      <img
                        src={r.poster}
                        alt=""
                        fetchPriority={i === 0 ? "high" : "auto"}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : null}
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={ativar ? r[modo] : undefined}
                      muted
                      playsInline
                      loop={total === 1}
                      preload={ativar ? "auto" : "none"}
                      disablePictureInPicture
                      disableRemotePlayback
                      tabIndex={-1}
                      aria-hidden="true"
                      onEnded={() => i === index && total > 1 && ir(1)}
                      onError={() => aoErrar(i)}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                );
              })}

              {/* Escurece a base no celular para o texto ficar legível */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[68%] bg-gradient-to-t from-berry-950 via-berry-950/80 to-transparent lg:hidden" />
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-black/40 to-transparent" />
            </div>

            {/* Barras de progresso: no celular ficam acima do vídeo; no PC, dentro dele */}
            <div className="absolute inset-x-4 -top-[26px] z-[3] flex gap-1.5 lg:inset-x-6 lg:top-4">
              {reels.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para o vídeo ${i + 1}: ${r.label}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group flex-1 py-3"
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/30 transition-[height] group-hover:h-[5px]">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="block h-full origin-left rounded-full bg-white"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Legenda do vídeo atual */}
            <div
              key={atual.id}
              className="animate-fade-up pointer-events-none absolute left-3 top-3 z-[3] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 py-1.5 pl-2.5 pr-3.5 text-[.78rem] font-medium backdrop-blur-md lg:left-6 lg:top-10"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-raspberry-light" />
              {atual.label}
            </div>

            {/* Controles: dentro do vídeo no celular, abaixo do cartão no computador */}
            <div className="absolute right-3 top-3 z-[3] flex items-center gap-2 lg:inset-x-0 lg:-bottom-[62px] lg:top-auto lg:justify-center lg:gap-3">
              <button type="button" onClick={() => ir(-1)} aria-label="Vídeo anterior" className={`${CTRL} hidden lg:flex`}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" onClick={alternar} aria-label={tocando ? "Pausar vídeos" : "Reproduzir vídeos"} className={CTRL}>
                {tocando ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-px" />}
              </button>
              <button type="button" onClick={() => ir(1)} aria-label="Próximo vídeo" className={CTRL}>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Enfeites flutuantes (só no computador) */}
            <div
              style={{ "--r": "-5deg" }}
              className="animate-float absolute -left-14 top-[34%] z-[4] hidden items-center gap-2.5 rounded-2xl border border-white/25 bg-white/15 py-2.5 pl-3 pr-4 text-[.85rem] font-medium shadow-[0_18px_40px_rgba(0,0,0,.3)] backdrop-blur-xl lg:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-raspberry text-white">
                <Heart size={16} fill="currentColor" />
              </span>
              <span className="leading-tight">
                Feito à mão
                <span className="block text-[.72rem] text-white/65">com muito carinho</span>
              </span>
            </div>
            <SpinBadge className="absolute -right-12 bottom-12 z-[4] hidden text-honey lg:flex" text="Fatias fresquinhas • Feito à mão • " size={118} />
          </div>
        </div>
      </div>
    </section>
  );
}

const CTRL =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-[background,transform] hover:scale-105 hover:bg-white/25 active:scale-95";
