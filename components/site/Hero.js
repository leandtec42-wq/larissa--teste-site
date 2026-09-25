import { ArrowRight, CakeSlice, MapPin, Tag } from "lucide-react";
import HeroStage from "./HeroStage";
import WhatsIcon from "./WhatsIcon";
import { REELS } from "@/lib/reels";
import { formatPreco } from "@/lib/format";

export default function Hero({ perfil, whatsappLink, sabores }) {
  const [primeiro, ...resto] = perfil.marca.split(" ");
  const sobrenome = resto.join(" ");
  const precoMin = sabores.length ? Math.min(...sabores.map((s) => s.preco)) : null;

  return (
    <HeroStage reels={REELS}>
      <span className="animate-fade-up mb-6 hidden items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[.8rem] font-medium tracking-wide backdrop-blur-md lg:inline-flex">
        <MapPin size={15} className="text-honey" /> {perfil.cidade}
      </span>

      <p className="animate-fade-up font-script mb-1 -rotate-2 text-[1.7rem] leading-none text-honey [animation-delay:.15s] sm:text-[2.1rem] lg:text-[2.4rem]">
        confeitaria artesanal
      </p>

      <h1 className="font-display text-[clamp(3rem,15vw,4.6rem)] font-semibold leading-[.95] tracking-tight sm:text-[4.8rem] lg:text-[clamp(4.4rem,6.6vw,7rem)]">
        <span className="block">
          <span className="word-mask" style={{ "--w": 0 }}>
            <span>{primeiro}</span>
          </span>
        </span>
        {sobrenome ? (
          <span className="block italic">
            <span className="word-mask" style={{ "--w": 1 }}>
              <span className="text-gradient-honey">{sobrenome}</span>
            </span>
          </span>
        ) : null}
      </h1>

      <p className="animate-fade-up mt-4 max-w-[30rem] text-[1.02rem] leading-relaxed text-white/85 [animation-delay:.55s] sm:text-[1.15rem] lg:mt-6 lg:text-[1.25rem]">
        {perfil.frase}
      </p>

      <div className="animate-fade-up mt-6 flex flex-col gap-3 [animation-delay:.7s] sm:flex-row sm:flex-wrap lg:mt-9 lg:gap-4">
        <a href={whatsappLink} className="btn btn-wa text-[1rem] lg:px-8 lg:py-[1.15rem]">
          <WhatsIcon size={22} />
          Quero encomendar
        </a>
        <a
          href="#evento"
          className="group inline-flex items-center justify-center gap-2 rounded-full py-2 text-[.95rem] font-semibold text-white/85 transition-[background,color,transform] duration-300 hover:text-white lg:border lg:border-white/40 lg:bg-white/12 lg:px-8 lg:py-[1.15rem] lg:backdrop-blur-md lg:hover:-translate-y-[3px] lg:hover:bg-white/25"
        >
          Ver próximo evento
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Fatos reais do cardápio (só no computador, para não competir com o vídeo no celular) */}
      <ul className="animate-fade-up mt-10 hidden items-center gap-x-8 text-[.9rem] text-white/75 [animation-delay:.9s] lg:flex">
        {sabores.length ? <Fato icon={<CakeSlice size={18} />} titulo={`${sabores.length} sabores`} legenda="No cardápio" /> : null}
        {precoMin != null ? <Fato icon={<Tag size={18} />} titulo={`a partir de ${formatPreco(precoMin)}`} legenda="Preços no cardápio" /> : null}
        <Fato icon={<WhatsIcon size={18} />} titulo="Peça pelo WhatsApp" legenda="Respondo rapidinho" />
      </ul>
    </HeroStage>
  );
}

function Fato({ icon, titulo, legenda }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-honey">{icon}</span>
      <span className="leading-tight">
        <strong className="block font-semibold text-white">{titulo}</strong>
        <span className="text-[.78rem]">{legenda}</span>
      </span>
    </li>
  );
}
