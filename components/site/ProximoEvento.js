import { Calendar, Clock, MapPin, Building2 } from "lucide-react";
import Reveal from "./Reveal";
import { formatDiaSemana, formatDataExtensa } from "@/lib/format";

export default function ProximoEvento({ eventos }) {
  const ev = eventos[0];

  return (
    <section id="evento" className="bg-cream py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mb-10 max-w-[640px]">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Onde vou estar
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Meu próximo evento</h2>
        </Reveal>

        <Reveal>
          {!ev ? (
            <div className="rounded-[32px] bg-cream-deep p-16 text-center shadow-sm">
              <h3 className="font-display mb-2 text-2xl">Nova data em breve</h3>
              <p className="text-cocoa-soft">Ainda não tenho um evento confirmado, mas fica de olho — em breve divulgo por aqui e no Instagram!</p>
            </div>
          ) : (
            <div className="relative grid grid-cols-1 overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-dark via-rose-deep to-gold text-white shadow-lg md:grid-cols-[1.05fr_1fr]">
              <div className="relative z-[1] p-9 sm:p-11">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-[.72rem] font-bold uppercase tracking-[.1em]">
                  <Calendar size={16} /> Próximo evento
                </span>
                <h3 className="font-display mb-[18px] text-[clamp(1.6rem,3.4vw,2.2rem)]">{ev.nome}</h3>
                <div className="mb-7 grid gap-3.5">
                  <Meta icon={<Calendar size={20} />} label="Quando" value={`${formatDiaSemana(ev.data)}, ${formatDataExtensa(ev.data)}`} />
                  <Meta icon={<Clock size={20} />} label="Horário" value={ev.horario} />
                  <Meta icon={<MapPin size={20} />} label="Local" value={ev.local} />
                  <Meta icon={<Building2 size={20} />} label="Cidade" value={ev.cidade} />
                </div>
                {ev.mapsLink ? (
                  <a
                    href={ev.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 px-7 py-4 text-[.95rem] font-semibold text-rose-dark transition-transform hover:-translate-y-0.5"
                  >
                    <MapPin size={18} /> Como chegar
                  </a>
                ) : null}
              </div>
              <div className="relative min-h-[260px] bg-cover bg-center" style={ev.imagem ? { backgroundImage: `url('${ev.imagem}')` } : undefined}>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(59,32,38,.55)] to-transparent md:bg-gradient-to-r" />
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Meta({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-[.98rem]">
      <span className="mt-0.5 opacity-90">{icon}</span>
      <span>
        <span className="mb-0.5 block text-[.72rem] uppercase tracking-[.08em] opacity-75">{label}</span>
        <strong className="block font-semibold">{value}</strong>
      </span>
    </div>
  );
}
