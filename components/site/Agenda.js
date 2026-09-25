import { Clock, MapPin, Building2, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { formatDataCurta, formatDiaSemana } from "@/lib/format";

/** Linha do tempo das próximas feiras: uma linha vertical liga as datas. */
export default function Agenda({ eventos }) {
  return (
    <section aria-label="Agenda de eventos" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-10 h-[340px] w-[340px] rounded-full bg-blush/80 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
          <SectionHead eyebrow="Minha agenda" title={<>Próximas feiras e <span className="italic text-gradient-berry">eventos</span></>} subtitle="Anota na agenda e vem provar as fatias fresquinhas." className="md:sticky md:top-32 md:mb-0 md:self-start" />

          {!eventos.length ? (
            <p className="self-center py-12 text-center text-cocoa-soft">Nenhum evento agendado no momento. Nova data em breve!</p>
          ) : (
            <Reveal as="ol" stagger className="relative grid gap-5 before:absolute before:bottom-6 before:left-[35px] before:top-6 before:w-px before:bg-gradient-to-b before:from-raspberry before:via-raspberry/30 before:to-transparent sm:before:left-[43px]">
              {eventos.map((ev, i) => {
                const { dia, mes } = formatDataCurta(ev.data);
                return (
                  <li key={ev.id} style={{ "--i": i }} className="relative grid grid-cols-[72px_1fr] items-center gap-4 sm:grid-cols-[88px_1fr] sm:gap-6">
                    <div className="relative z-[1] flex h-[72px] w-[72px] flex-col items-center justify-center rounded-[22px] bg-gradient-to-br from-raspberry-light to-raspberry text-white shadow-[0_14px_30px_-10px_rgba(214,51,108,.6)] sm:h-[88px] sm:w-[88px] sm:rounded-3xl">
                      <span className="font-display text-[1.8rem] font-bold leading-none sm:text-[2.2rem]">{dia}</span>
                      <span className="text-[.68rem] font-semibold uppercase tracking-[.14em]">{mes}</span>
                    </div>

                    <article className="group rounded-3xl border border-berry-900/8 bg-vanilla p-5 transition-[transform,box-shadow,border-color] duration-500 hover:translate-x-1.5 hover:border-raspberry/30 hover:shadow-[0_24px_44px_-24px_rgba(214,51,108,.5)] sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="mb-1 text-[.72rem] font-semibold uppercase tracking-[.14em] text-raspberry">{formatDiaSemana(ev.data)}</p>
                          <h3 className="font-display text-[1.3rem] font-semibold leading-tight text-berry-900">{ev.nome}</h3>
                        </div>
                        {ev.mapsLink ? (
                          <a
                            href={ev.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Como chegar: ${ev.nome}`}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-berry-900 text-white transition-[background,transform] duration-300 hover:rotate-12 hover:bg-raspberry group-hover:scale-105"
                          >
                            <ArrowUpRight size={19} />
                          </a>
                        ) : null}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[.88rem] text-cocoa-soft">
                        <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-raspberry" /> {ev.horario}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin size={15} className="text-raspberry" /> {ev.local}</span>
                        <span className="inline-flex items-center gap-1.5"><Building2 size={15} className="text-raspberry" /> {ev.cidade}</span>
                      </div>
                    </article>
                  </li>
                );
              })}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
