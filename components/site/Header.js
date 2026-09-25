"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import WhatsIcon from "./WhatsIcon";
import InstagramIcon from "./InstagramIcon";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#evento", label: "Onde vou estar" },
  { href: "#sabores", label: "Sabores" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#encomendas", label: "Encomendas" },
];

export default function Header({ whatsappLink, instagramLink, marca }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ativo, setAtivo] = useState("");

  // Estado do cabeçalho + barra de progresso da página.
  useEffect(() => {
    const barra = document.getElementById("scroll-progress");
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 200) setAtivo("");
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      const pct = altura > 0 ? (window.scrollY / altura) * 100 : 0;
      if (barra) barra.style.transform = `scaleX(${Math.min(1, Math.max(0, pct / 100))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Destaca no menu a seção que está na tela.
  useEffect(() => {
    const secoes = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!secoes.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setAtivo(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu aberto: trava a rolagem e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const claro = scrolled && !open;

  return (
    <>
      <div
        id="scroll-progress"
        className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-honey via-raspberry-light to-raspberry"
      />
      <header className="fixed inset-x-0 top-0 z-[110] px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-[56px] max-w-[1180px] items-center justify-between rounded-full pl-5 pr-2 transition-[background,box-shadow,border-color,backdrop-filter] duration-500 md:h-[62px] md:pl-7 md:pr-2.5 ${
            claro
              ? "border border-berry-900/10 bg-white/80 shadow-[0_10px_40px_-10px_rgba(58,15,44,.25)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <a
            href="#topo"
            aria-label={`${marca} — voltar ao topo`}
            className={`font-display text-[1.25rem] font-semibold tracking-tight transition-colors md:text-[1.4rem] ${claro ? "text-berry-900" : "text-white"}`}
          >
            {marca.split(" ")[0]} <span className="italic text-raspberry-light">{marca.split(" ").slice(1).join(" ")}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 text-[.9rem] font-medium md:flex">
            {LINKS.map((l) => {
              const ligado = ativo === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={ligado ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 transition-colors ${
                    claro
                      ? ligado
                        ? "bg-raspberry/10 text-raspberry"
                        : "text-cocoa-soft hover:text-berry-900"
                      : ligado
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <a href={whatsappLink} className="btn btn-wa hidden !px-5 !py-3 text-[.88rem] md:inline-flex">
            <WhatsIcon size={18} />
            Encomendar
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className={`relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
              claro ? "border-berry-900/15 text-berry-900" : "border-white/35 bg-white/10 text-white backdrop-blur-md"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu do celular: tela cheia, links entram em cascata */}
      <div
        id="menu-mobile"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-[105] flex flex-col justify-between overflow-y-auto bg-berry-950 px-7 pb-8 pt-[104px] text-white transition-[clip-path] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "[clip-path:circle(150%_at_calc(100%_-_40px)_40px)]" : "[clip-path:circle(0%_at_calc(100%_-_40px)_40px)]"
        }`}
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <nav aria-label="Menu" className="relative flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${250 + i * 70}ms` : "0ms" }}
              className={`font-display flex items-baseline gap-4 border-b border-white/10 py-4 text-[2rem] transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="font-body text-[.8rem] font-medium tabular-nums text-honey">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div
          style={{ transitionDelay: open ? "650ms" : "0ms" }}
          className={`relative mt-8 grid gap-4 transition-[opacity,transform] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <a href={whatsappLink} onClick={() => setOpen(false)} className="btn btn-wa">
            <WhatsIcon size={22} />
            Chamar no WhatsApp
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 text-[.95rem] text-white/75"
          >
            <InstagramIcon size={18} /> @larissaoliveiracakes
          </a>
        </div>
      </div>
    </>
  );
}
