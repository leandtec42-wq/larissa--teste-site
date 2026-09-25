import { Sparkle } from "lucide-react";

const FRASES = ["Tortas artesanais", "Fatias fresquinhas", "Feito à mão", "Receita própria", "Sob encomenda", "Feito com carinho"];

/** Faixa inclinada com texto correndo — faz a ponte visual entre o topo escuro e o resto. */
export default function Marquee({ cidade }) {
  const itens = [...FRASES, cidade];
  return (
    <div className="relative z-10 -mt-7 overflow-x-clip md:-mt-9" aria-hidden="true">
      <div className="-mx-6 -rotate-[1.4deg] overflow-hidden bg-gradient-to-r from-raspberry via-[#e8457f] to-berry-700 py-4 shadow-[0_18px_40px_rgba(214,51,108,.3)] md:py-5">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((k) => (
            <ul key={k} className="flex shrink-0 items-center">
              {itens.map((t) => (
                <li key={`${k}-${t}`} className="flex items-center font-display text-[1.15rem] italic text-white md:text-[1.5rem]">
                  <span className="px-6 md:px-9">{t}</span>
                  <Sparkle size={16} fill="currentColor" className="text-honey" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
