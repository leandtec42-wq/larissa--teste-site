import Reveal from "./Reveal";
import WhatsIcon from "./WhatsIcon";
import { formatPreco } from "@/lib/format";
import { buildWhatsappLink, fillTemplate } from "@/lib/whatsapp";

export default function Sabores({ sabores, perfil }) {
  return (
    <section id="sabores" className="bg-cream-deep py-16 md:py-[90px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Sabores
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Escolha sua fatia favorita</h2>
        </Reveal>

        {!sabores.length ? (
          <p className="text-center text-cocoa-soft">Novos sabores chegando em breve!</p>
        ) : (
          <Reveal as="div" stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sabores.map((s, i) => {
              const link = buildWhatsappLink(perfil.whatsapp, fillTemplate(perfil.tplProduto, { nome: s.nome }));
              return (
                <article
                  key={s.id}
                  style={{ "--i": i }}
                  className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(198,116,140,.28)]"
                >
                  <div className="group relative aspect-square overflow-hidden">
                    <img
                      src={s.foto}
                      alt={s.nome}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute bottom-3.5 right-3.5 rounded-full bg-cocoa/80 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                      {formatPreco(s.preco)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
                    <h3 className="text-[1.25rem] font-semibold">{s.nome}</h3>
                    <p className="flex-1 text-sm text-cocoa-soft">{s.descricao}</p>
                    <a
                      href={link}
                      className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(37,211,102,.35)] transition-[background,transform] hover:-translate-y-0.5 hover:bg-whatsapp-dark"
                    >
                      <WhatsIcon size={18} /> Pedir pelo WhatsApp
                    </a>
                  </div>
                </article>
              );
            })}
          </Reveal>
        )}
      </div>
    </section>
  );
}
