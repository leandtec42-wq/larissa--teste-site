import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import WhatsIcon from "./WhatsIcon";

export default function Sobre({ perfil, whatsappLink }) {
  return (
    <section aria-label="Sobre a Larissa" className="pb-10 pt-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
              <span className="h-0.5 w-5 rounded bg-gold" /> O cantinho digital da Larissa
            </span>
            <h2 className="font-display mb-4 text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">
              Cada fatia carrega um pouco de mim
            </h2>
            <p className="mb-6 leading-relaxed text-cocoa-soft">{perfil.descricao}</p>
            <a
              href={whatsappLink}
              className="inline-flex items-center gap-2.5 rounded-full border border-rose-deep px-7 py-4 text-[.95rem] font-semibold text-rose-dark transition-[background,transform] hover:-translate-y-0.5 hover:bg-rose-soft"
            >
              <WhatsIcon size={18} /> Fale comigo no WhatsApp
            </a>
          </div>

          <div className="relative mx-auto max-w-[380px] pt-4 pb-[15%] pr-0 sm:pr-[10%]">
            <span className="absolute right-0 top-0 z-[1] inline-flex -rotate-[4deg] items-center gap-1.5 rounded-full bg-gold px-4 py-2.5 font-display text-[.78rem] font-semibold text-white shadow-md">
              Feito à mão, com carinho <Heart size={13} fill="currentColor" />
            </span>
            <div className="overflow-hidden rounded-[32px] shadow-lg">
              <img
                src={perfil.fotoPerfil}
                alt={`${perfil.nome}, confeiteira, sorrindo com uma fatia de torta em mãos`}
                width={550}
                height={733}
                className="w-full"
              />
            </div>
            {perfil.fotoSecundaria ? (
              <div className="absolute -left-[6%] bottom-0 aspect-square w-[48%] -rotate-[5deg] overflow-hidden rounded-[20px] border-[5px] border-cream shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-rotate-[1deg] hover:scale-[1.04]">
                <img
                  src={perfil.fotoSecundaria}
                  alt={`${perfil.nome} sorrindo em uma feira, ao lado de suas tortas`}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
