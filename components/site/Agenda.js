import { Clock, MapPin, Building2 } from "lucide-react";
import Reveal from "./Reveal";
import { formatDataCurta } from "@/lib/format";

export default function Agenda({ eventos }) {
  return (
    <section className="bg-white py-16 md:py-[90px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-10 max-w-[640px]">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Minha agenda
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Próximas feiras e eventos</h2>
        </Reveal>

        {!eventos.length ? (
          <p className="py-12 text-center text-cocoa-soft">Nenhum evento agendado no momento. Nova data em breve!</p>
        ) : (
          <Reveal as="div" stagger className="grid gap-4.5">
            {eventos.map((ev, i) => {
              const { dia, mes } = formatDataCurta(ev.data);
              return (
                <div
                  key={ev.id}
                  style={{ "--i": i }}
                  className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-[20px] border border-rose-dark/10 bg-cream p-5 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-md sm:grid-cols-[auto_1fr_auto] sm:p-6"
                >
                  <div className="flex h-[74px] w-[74px] flex-shrink-0 flex-col items-center justify-center rounded-[18px] bg-gradient-to-br from-rose to-rose-deep text-white">
                    <span className="font-display text-[1.6rem] font-bold leading-none">{dia}</span>
                    <span className="text-[.68rem] uppercase tracking-[.06em]">{mes}</span>
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[1.15rem] font-semibold">{ev.nome}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-cocoa-soft">
                      <span className="inline-flex items-center gap-1.5"><Clock size={15} /> {ev.horario}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={15} /> {ev.local}</span>
                      <span className="inline-flex items-center gap-1.5"><Building2 size={15} /> {ev.cidade}</span>
                    </div>
                  </div>
                  {ev.mapsLink ? (
                    <a
                      href={ev.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 mt-2 inline-flex items-center justify-center rounded-full border border-rose-deep px-6 py-3 text-sm font-semibold text-rose-dark transition-[background,transform] hover:-translate-y-0.5 hover:bg-rose-soft sm:col-span-1 sm:mt-0"
                    >
                      Como chegar
                    </a>
                  ) : null}
                </div>
              );
            })}
          </Reveal>
        )}
      </div>
    </section>
  );
}
