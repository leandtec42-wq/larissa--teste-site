"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#evento", label: "Onde vou estar" },
  { href: "#sabores", label: "Sabores" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#encomendas", label: "Encomendas" },
  { href: "#vitrine", label: "Vitrine" },
];

export default function Header({ whatsappLink }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const trackHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = trackHeight > 0 ? (window.scrollY / trackHeight) * 100 : 0;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 z-[101] h-[3px] md:h-1 w-0 bg-gradient-to-r from-gold to-rose-deep shadow-[0_0_10px_rgba(201,155,93,.5)] transition-[width] duration-100 ease-linear"
      />
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex h-[76px] items-center transition-[background,box-shadow,backdrop-filter] duration-400 ${
          scrolled ? "bg-cream/90 backdrop-blur-lg shadow-[0_6px_24px_rgba(59,44,44,.08)]" : ""
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <Link
            href="#topo"
            className={`font-display text-[1.35rem] font-semibold transition-colors ${scrolled ? "text-cocoa" : "text-white"}`}
          >
            Larissa <span className="text-rose-deep">Oliveira</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-rose-deep after:transition-[width] after:duration-300 hover:after:w-full ${
                  scrolled ? "text-cocoa-soft" : "text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={whatsappLink}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Quero encomendar
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
              scrolled ? "border-cocoa/20 text-cocoa" : "border-white/70 bg-white/10 text-white"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[99] flex flex-col gap-6 bg-cream px-8 pb-10 pt-[100px] transition-transform duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-[1.6rem] text-cocoa">
            {l.label}
          </a>
        ))}
        <a
          href={whatsappLink}
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-7 py-4 text-sm font-semibold text-white shadow-md"
        >
          Quero encomendar
        </a>
      </div>
    </>
  );
}
