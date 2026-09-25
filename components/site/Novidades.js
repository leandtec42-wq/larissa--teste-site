import Reveal from "./Reveal";

export default function Novidades({ publicacoes }) {
  if (!publicacoes.length) return null;

  return (
    <section className="bg-cream-deep py-16 md:py-[70px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-10 max-w-[640px]">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Novidades
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">O que está rolando por aqui</h2>
        </Reveal>

        <Reveal as="div" stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publicacoes.map((p, i) => (
            <article key={p.id} style={{ "--i": i }} className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm">
              {p.foto ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.foto} alt={p.titulo} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                {p.categoria ? <span className="text-[.72rem] font-semibold uppercase tracking-[.1em] text-rose-dark">{p.categoria}</span> : null}
                <h3 className="text-[1.2rem] font-semibold">{p.titulo}</h3>
                {p.descricao ? <p className="text-sm text-cocoa-soft">{p.descricao}</p> : null}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
