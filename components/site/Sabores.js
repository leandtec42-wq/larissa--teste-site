import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import WhatsIcon from "./WhatsIcon";
import { formatPreco } from "@/lib/format";
import { buildWhatsappLink, fillTemplate } from "@/lib/whatsapp";

export default function Sabores({ sabores, perfil }) {
  return (
    <section id="sabores" className="relative overflow-hidden bg-vanilla py-20 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-blush/90 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[420px] w-[420px] rounded-full bg-[#ffe9c9]/70 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          center
          eyebrow="Sabores"
          title={<>Escolha sua <span className="italic text-gradient-berry">fatia</span> favorita</>}
          subtitle="Cada sabor é feito à mão. Clicou, já cai direto no meu WhatsApp."
        />

        {!sabores.length ? (
          <p className="text-center text-cocoa-soft">Novos sabores chegando em breve!</p>
        ) : (
          <Reveal
            as="div"
            stagger
            className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-7 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          >
            {sabores.map((s, i) => {
              const link = buildWhatsappLink(perfil.whatsapp, fillTemplate(perfil.tplProduto, { nome: s.nome }));
              return (
                <div key={s.id} style={{ "--i": i }} className="w-[80%] shrink-0 snap-center sm:w-auto">
                  <article className="group flex h-full flex-col rounded-[32px] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(58,15,44,.45)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_40px_70px_-30px_rgba(214,51,108,.55)]">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]">
                      <img
                        src={s.foto}
                        alt={s.nome}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-berry-950/40 via-transparent to-transparent opacity-80" />
                      <span className="absolute right-3 top-3 flex items-center rounded-full bg-white px-4 py-2 text-berry-900 shadow-[0_10px_24px_rgba(0,0,0,.25)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <span className="font-display text-[1.25rem] font-bold leading-none">{formatPreco(s.preco)}</span>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-5">
                      <h3 className="font-display text-[1.35rem] font-semibold leading-tight text-berry-900">{s.nome}</h3>
                      <p className="flex-1 text-[.92rem] leading-relaxed text-cocoa-soft">{s.descricao}</p>
                      <a href={link} className="btn btn-wa mt-2 !py-3.5 text-[.9rem]">
                        <WhatsIcon size={19} /> Pedir pelo WhatsApp
                      </a>
                    </div>
                  </article>
                </div>
              );
            })}
          </Reveal>
        )}
      </div>
    </section>
  );
}
