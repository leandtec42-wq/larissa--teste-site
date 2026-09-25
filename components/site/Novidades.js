import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { formatDataExtensa } from "@/lib/format";

/**
 * Novidades em formato editorial: a primeira publicação ganha destaque grande,
 * as demais ficam em cartões menores ao lado (celular: carrossel horizontal).
 */
export default function Novidades({ publicacoes }) {
  if (!publicacoes.length) return null;
  const [destaque, ...outras] = publicacoes;

  return (
    <section aria-label="Novidades" className="relative bg-blush py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead eyebrow="Novidades" title={<>O que está <span className="italic text-gradient-berry">rolando</span> por aqui</>} />

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal variant="left">
            <Card p={destaque} grande />
          </Reveal>

          {outras.length ? (
            <Reveal
              as="div"
              stagger
              className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 lg:content-between"
            >
              {outras.map((p, i) => (
                <div key={p.id} style={{ "--i": i }} className="w-[78%] shrink-0 snap-center sm:w-auto">
                  <Card p={p} />
                </div>
              ))}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Card({ p, grande = false }) {
  return (
    <article className={`group relative isolate overflow-hidden rounded-[32px] bg-berry-900 text-white shadow-[0_30px_60px_-30px_rgba(58,15,44,.6)] ${grande ? "h-full min-h-[380px] sm:min-h-[520px]" : "aspect-[4/3] sm:aspect-[16/8]"}`}>
      {p.foto ? (
        <img
          src={p.foto}
          alt={p.titulo}
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-berry-950/95 via-berry-950/45 to-transparent" />

      <div className="flex h-full flex-col justify-end gap-2 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[.7rem] font-semibold uppercase tracking-[.14em]">
          {p.categoria ? <span className="rounded-full bg-raspberry px-3 py-1.5">{p.categoria}</span> : null}
          <span className="text-white/70">{formatDataExtensa(p.data)}</span>
        </div>
        <h3 className={`font-display font-semibold leading-tight ${grande ? "text-[clamp(1.6rem,3vw,2.4rem)]" : "text-[1.2rem] sm:text-[1.35rem]"}`}>{p.titulo}</h3>
        {p.descricao ? <p className={`max-w-[34rem] text-white/80 ${grande ? "text-[1rem]" : "line-clamp-2 text-[.88rem]"}`}>{p.descricao}</p> : null}
      </div>
    </article>
  );
}
