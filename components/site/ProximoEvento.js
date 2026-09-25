import { Calendar, Clock, MapPin, Building2, Navigation } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import WhatsIcon from "./WhatsIcon";
import { formatDiaSemana, formatDataExtensa, formatDataCurta } from "@/lib/format";
import { buildWhatsappLink, fillTemplate } from "@/lib/whatsapp";

export default function ProximoEvento({ eventos, perfil }) {
  const ev = eventos[0];

  return (
    <section id="evento" className="relative bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead eyebrow="Onde vou estar" title={<>Meu próximo <span className="italic text-gradient-berry">encontro</span> com você</>} />

        <Reveal variant="zoom">
          {!ev ? (
            <div className="rounded-[36px] border border-dashed border-raspberry/30 bg-white/60 p-12 text-center md:p-20">
              <h3 className="font-display mb-3 text-3xl text-berry-900">Nova data em breve</h3>
              <p className="mx-auto max-w-md text-cocoa-soft">Ainda não tenho um evento confirmado, mas fica de olho — em breve divulgo por aqui e no Instagram!</p>
            </div>
          ) : (
            <Ingresso ev={ev} perfil={perfil} />
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** O evento como um "ingresso": data grande, picote no meio e foto do lugar. */
function Ingresso({ ev, perfil }) {
  const { dia, mes } = formatDataCurta(ev.data);
  const conversa = buildWhatsappLink(perfil.whatsapp, fillTemplate(perfil.tplEvento, { evento: ev.nome }));

  return (
    <div className="relative grid overflow-hidden rounded-[36px] bg-gradient-to-br from-berry-900 via-berry-800 to-berry-700 text-white shadow-[0_40px_90px_-30px_rgba(58,15,44,.7)] md:grid-cols-[1.1fr_.9fr]">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-raspberry/40 blur-3xl" aria-hidden="true" />

      <div className="relative z-[1] grid grid-cols-[auto_1fr] gap-x-6 p-7 sm:p-10 md:p-12">
        {/* Data grande */}
        <div className="flex h-[92px] w-[80px] flex-col items-center justify-center rounded-3xl bg-white text-berry-900 shadow-[0_18px_40px_-14px_rgba(0,0,0,.5)] sm:h-[108px] sm:w-[94px]">
          <span className="font-display text-[2.6rem] font-bold leading-none sm:text-[3.1rem]">{dia}</span>
          <span className="mt-1 text-[.72rem] font-bold uppercase tracking-[.16em] text-raspberry">{mes}</span>
        </div>
        <div className="self-center">
          <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[.7rem] font-bold uppercase tracking-[.14em] text-honey">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-honey opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-honey" />
            </span>
            Próximo evento
          </span>
          <p className="text-[.9rem] text-white/70">{formatDiaSemana(ev.data)}</p>
        </div>

        <div className="col-span-2 mt-7">
          <h3 className="font-display mb-6 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.1]">{ev.nome}</h3>
          {ev.descricao ? <p className="mb-6 max-w-[30rem] leading-relaxed text-white/75">{ev.descricao}</p> : null}

          <dl className="mb-8 grid gap-4 sm:grid-cols-2">
            <Meta icon={<Calendar size={19} />} label="Quando" value={formatDataExtensa(ev.data)} />
            <Meta icon={<Clock size={19} />} label="Horário" value={ev.horario} />
            <Meta icon={<MapPin size={19} />} label="Local" value={ev.local} />
            <Meta icon={<Building2 size={19} />} label="Cidade" value={ev.cidade} />
          </dl>

          <div className="flex flex-wrap gap-3">
            {ev.mapsLink ? (
              <a href={ev.mapsLink} target="_blank" rel="noopener noreferrer" className="btn bg-white text-berry-900 shadow-[0_14px_30px_-10px_rgba(0,0,0,.5)] hover:bg-blush">
                <Navigation size={18} /> Como chegar
              </a>
            ) : null}
            <a href={conversa} className="btn btn-wa">
              <WhatsIcon size={19} /> Falar sobre o evento
            </a>
          </div>
        </div>
      </div>

      {/* Foto do evento com picote (perfuração de ingresso) na divisa */}
      <div className="relative min-h-[280px] overflow-hidden md:min-h-full">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1600ms] ease-out hover:scale-105" style={ev.imagem ? { backgroundImage: `url('${ev.imagem}')` } : undefined} />
        <div className="absolute inset-0 bg-gradient-to-t from-berry-950/60 via-transparent to-transparent md:bg-gradient-to-r md:from-berry-800 md:via-berry-800/15" />
        <div className="absolute inset-y-6 left-0 hidden w-0 border-l-2 border-dashed border-white/25 md:block" />
      </div>
    </div>
  );
}

function Meta({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/12 text-honey">{icon}</span>
      <div>
        <dt className="text-[.7rem] uppercase tracking-[.12em] text-white/55">{label}</dt>
        <dd className="font-medium">{value}</dd>
      </div>
    </div>
  );
}
