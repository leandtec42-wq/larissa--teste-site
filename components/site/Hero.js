import { MapPin } from "lucide-react";
import HeroVideo from "./HeroVideo";
import WhatsIcon from "./WhatsIcon";

export default function Hero({ perfil, whatsappLink }) {
  return (
    <section id="topo" className="relative flex min-h-[100svh] items-end overflow-hidden text-white">
      <HeroVideo src={perfil.videoCapa} poster={perfil.fotoCapa} />

      <div className="relative z-[1] w-full px-5 pb-[76px] pt-[120px] sm:px-8 sm:pb-[90px] md:pb-[76px] md:pt-[160px]">
        <div className="mx-auto max-w-[1180px]">
          <span className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[.78rem] font-semibold tracking-wide backdrop-blur-sm">
            <MapPin size={15} /> {perfil.cidade}
          </span>
          <h1 className="animate-fade-up [animation-delay:.1s] font-display mb-3 text-[clamp(1.9rem,8vw,4.6rem)] font-semibold leading-[1.08]">
            Larissa <em className="italic text-rose-soft">Oliveira</em>
          </h1>
          <p className="animate-fade-up [animation-delay:.2s] mb-8 max-w-[520px] text-[clamp(1.05rem,2vw,1.3rem)] text-white/92">
            {perfil.frase}
          </p>
          <div className="animate-fade-up [animation-delay:.3s] flex flex-wrap gap-4">
            <a
              href={whatsappLink}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-rose-deep to-rose-dark px-7 py-4 text-[.95rem] font-semibold shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              <WhatsIcon size={20} />
              Quero encomendar
            </a>
            <a
              href="#evento"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/15 px-7 py-4 text-[.95rem] font-semibold backdrop-blur-sm transition-[background,transform] hover:-translate-y-0.5 hover:bg-white/28"
            >
              Ver próximo evento
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-[1] hidden -translate-x-1/2 flex-col items-center gap-2 text-[.7rem] uppercase tracking-[.18em] text-white/85 sm:flex">
        <span>role</span>
        <span className="animate-scroll-line relative h-[34px] w-px overflow-hidden bg-white/60" />
      </div>
    </section>
  );
}
