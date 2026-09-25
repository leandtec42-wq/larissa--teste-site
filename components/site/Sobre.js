import { Cherry, ChefHat, HandHeart } from "lucide-react";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SpinBadge from "./SpinBadge";
import WhatsIcon from "./WhatsIcon";

const PILARES = [
  { icon: ChefHat, titulo: "Receita própria", texto: "Cada torta nasce de uma receita criada por mim." },
  { icon: Cherry, titulo: "Ingredientes selecionados", texto: "Escolhidos com cuidado, do recheio à cobertura." },
  { icon: HandHeart, titulo: "Feito com carinho", texto: "Do preparo à entrega, o cuidado de quem ama o que faz." },
];

export default function Sobre({ perfil, whatsappLink }) {
  return (
    <section id="sobre" aria-label="Sobre a Larissa" className="relative overflow-hidden bg-vanilla pb-20 pt-28 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-blush blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[#ffe9c9]/70 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid items-center gap-16 md:grid-cols-[.9fr_1.1fr] md:gap-20">
          {/* Fotos */}
          <Reveal variant="left" className="relative mx-auto w-full max-w-[420px] pb-14 pl-6 md:mx-0">
            <Parallax speed={0.05}>
              <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-blush shadow-[0_40px_80px_-30px_rgba(58,15,44,.45)] ring-1 ring-berry-900/5">
                <img
                  src={perfil.fotoPerfil}
                  alt={`${perfil.nome}, confeiteira, sorrindo com uma fatia de torta em mãos`}
                  width={550}
                  height={733}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                />
              </div>
            </Parallax>

            {perfil.fotoSecundaria ? (
              <Parallax speed={-0.07} className="absolute -bottom-2 -left-2 w-[46%] sm:-left-6">
                <div className="aspect-square -rotate-6 overflow-hidden rounded-full border-[6px] border-vanilla shadow-[0_24px_50px_-16px_rgba(58,15,44,.5)] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                  <img
                    src={perfil.fotoSecundaria}
                    alt={`${perfil.nome} sorrindo em uma feira, ao lado de suas tortas`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Parallax>
            ) : null}

            <SpinBadge className="absolute -right-2 top-[22%] z-[2] rounded-full bg-raspberry p-1 text-white shadow-[0_18px_40px_rgba(214,51,108,.45)] sm:-right-6" size={112} />
          </Reveal>

          {/* Texto */}
          <div>
            <Reveal>
              <span className="eyebrow mb-4">O cantinho digital da Larissa</span>
              <h2 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.06] tracking-tight text-berry-900">
                Cada fatia carrega <span className="italic text-gradient-berry">um pouco de mim</span>
              </h2>
              <p className="mt-6 max-w-[34rem] text-[1.08rem] leading-[1.75] text-cocoa-soft">{perfil.descricao}</p>
            </Reveal>

            <Reveal as="ul" stagger className="mt-9 grid gap-3.5 sm:grid-cols-3">
              {PILARES.map((p, i) => (
                <li
                  key={p.titulo}
                  style={{ "--i": i }}
                  className="group rounded-3xl border border-berry-900/8 bg-white/80 p-5 shadow-[0_10px_30px_-18px_rgba(58,15,44,.3)] backdrop-blur transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-20px_rgba(214,51,108,.45)]"
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-raspberry-light to-raspberry text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <p.icon size={20} />
                  </span>
                  <h3 className="mb-1 text-[.98rem] font-semibold text-berry-900">{p.titulo}</h3>
                  <p className="text-[.86rem] leading-relaxed text-cocoa-soft">{p.texto}</p>
                </li>
              ))}
            </Reveal>

            <Reveal delay={200} className="mt-9">
              <a href={whatsappLink} className="btn btn-wa">
                <WhatsIcon size={20} /> Fale comigo no WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
