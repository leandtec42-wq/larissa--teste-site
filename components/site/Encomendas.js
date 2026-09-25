import { Cookie, MessageCircleHeart, ClipboardList, Truck, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import WhatsIcon from "./WhatsIcon";

const PASSOS = [
  { icon: Cookie, titulo: "Você escolhe o sabor", texto: "Dá uma olhada na seção de sabores e escolhe sua fatia ou torta favorita." },
  { icon: MessageCircleHeart, titulo: "Chama no WhatsApp", texto: "Um clique e já cai direto na nossa conversa." },
  { icon: ClipboardList, titulo: "Combinamos os detalhes", texto: "Quantidade, tamanho, sabor e qualquer detalhe especial." },
  { icon: Truck, titulo: "Retirada ou entrega", texto: "Você escolhe o que for melhor pra você." },
  { icon: Sparkles, titulo: "Preparo artesanal", texto: "Com todo cuidado, carinho e capricho de sempre." },
];

export default function Encomendas({ whatsappLink }) {
  return (
    <section id="encomendas" className="relative overflow-hidden bg-cream py-20 md:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          center
          eyebrow="Encomendas"
          title={<>Como fazer sua <span className="italic text-gradient-berry">encomenda</span></>}
          subtitle="Simples, rápido e direto comigo."
        />

        <Reveal
          as="ol"
          stagger
          className="relative grid gap-4 md:grid-cols-5 md:gap-5 md:before:absolute md:before:left-[10%] md:before:right-[10%] md:before:top-[38px] md:before:h-px md:before:bg-[repeating-linear-gradient(90deg,var(--raspberry)_0_8px,transparent_8px_16px)] md:before:opacity-40"
        >
          {PASSOS.map((p, i) => (
            <li
              key={p.titulo}
              style={{ "--i": i }}
              className="group relative flex items-start gap-4 rounded-3xl bg-white/70 p-5 transition-[transform,background,box-shadow] duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_26px_50px_-28px_rgba(214,51,108,.55)] md:flex-col md:items-center md:bg-transparent md:p-2 md:text-center md:hover:bg-transparent md:hover:shadow-none"
            >
              <span className="relative z-[1] flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white text-raspberry shadow-[0_14px_30px_-12px_rgba(214,51,108,.55)] ring-8 ring-cream transition-[transform,background,color] duration-500 group-hover:scale-110 group-hover:bg-raspberry group-hover:text-white md:h-[76px] md:w-[76px]">
                <p.icon size={26} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-berry-900 text-[.7rem] font-bold text-white">{i + 1}</span>
              </span>
              <div className="md:mt-2">
                <h3 className="mb-1 text-[1.02rem] font-semibold text-berry-900">{p.titulo}</h3>
                <p className="text-[.88rem] leading-relaxed text-cocoa-soft">{p.texto}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal variant="zoom" className="mt-14 md:mt-20">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-berry-900 via-berry-800 to-raspberry p-8 text-center text-white shadow-[0_40px_80px_-30px_rgba(58,15,44,.7)] sm:p-12">
            <div className="animate-blob pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-honey/30 blur-3xl" aria-hidden="true" />
            <div className="grain pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-display mb-2 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight">Bora garantir sua fatia?</h3>
              <p className="mx-auto mb-7 max-w-md text-white/80">Chama agora mesmo, respondo rapidinho!</p>
              <a href={whatsappLink} className="btn btn-wa text-[1rem] sm:px-10 sm:py-[1.2rem]">
                <WhatsIcon size={22} /> Fazer encomenda pelo WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
