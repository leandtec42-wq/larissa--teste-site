import Link from "next/link";
import { ArrowUp, MapPin } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import WhatsIcon from "./WhatsIcon";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#evento", label: "Onde vou estar" },
  { href: "#sabores", label: "Sabores" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#encomendas", label: "Encomendas" },
  { href: "#vitrine", label: "Vitrine" },
];

export default function Footer({ perfil, whatsappLink }) {
  const [primeiro, ...resto] = perfil.marca.split(" ");

  return (
    <footer className="relative overflow-hidden bg-berry-950 pt-20 text-white/75">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-raspberry/25 blur-[90px]" aria-hidden="true" />
      <div className="grain pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="font-script mb-1 text-[1.6rem] text-honey">feito à mão, com carinho</p>
            <div className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-none tracking-tight text-white">
              {primeiro} <span className="italic text-gradient-honey">{resto.join(" ")}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={perfil.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white transition-[background,transform,border-color] duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]"
            >
              <InstagramIcon size={24} />
            </a>
            <a
              href={whatsappLink}
              aria-label="WhatsApp"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-white transition-[background,transform,border-color] duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-whatsapp"
            >
              <WhatsIcon size={26} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 border-t border-white/10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <p className="max-w-[340px] text-[.95rem] leading-relaxed">{perfil.frase}</p>

          <div>
            <h4 className="mb-4 text-[.78rem] font-semibold uppercase tracking-[.16em] text-honey">Navegação</h4>
            <ul className="grid gap-2.5 text-[.95rem]">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-raspberry-light">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[.78rem] font-semibold uppercase tracking-[.16em] text-honey">Contato</h4>
            <ul className="grid gap-2.5 text-[.95rem]">
              <li className="flex items-center gap-2"><MapPin size={16} className="text-raspberry-light" /> {perfil.cidade}</li>
              <li>
                <a href={whatsappLink} className="inline-flex items-center gap-2 transition-colors hover:text-whatsapp"><WhatsIcon size={16} /> Chamar no WhatsApp</a>
              </li>
              <li>
                <a href={perfil.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-raspberry-light"><InstagramIcon size={16} /> @larissaoliveiracakes</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 pr-20 text-[.8rem] text-white/50 sm:pr-24">
          <span>© {new Date().getFullYear()} {perfil.marca}. Feito com carinho em {perfil.cidade}.</span>
          <div className="flex items-center gap-5">
            <Link href="/admin" className="transition-colors hover:text-raspberry-light">Painel administrativo</Link>
            <a href="#topo" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              Voltar ao topo <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
