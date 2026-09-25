import { Cookie, MessageCircleHeart, ClipboardList, Truck, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import WhatsIcon from "./WhatsIcon";

const PASSOS = [
  { icon: Cookie, titulo: "Você escolhe o sabor", texto: "Dá uma olhada na seção de sabores e escolhe sua fatia ou torta favorita." },
  { icon: MessageCircleHeart, titulo: "Entra em contato pelo WhatsApp", texto: "Um clique e já cai direto na nossa conversa." },
  { icon: ClipboardList, titulo: "Conversamos sobre quantidade e detalhes", texto: "Combinamos tamanho, sabor e qualquer detalhe especial." },
  { icon: Truck, titulo: "Combinamos a retirada/entrega", texto: "Você escolhe o que for melhor pra você." },
  { icon: Sparkles, titulo: "Sua encomenda é preparada artesanalmente", texto: "Com todo cuidado, carinho e capricho de sempre." },
];

export default function Encomendas({ whatsappLink }) {
  return (
    <section id="encomendas" className="bg-cream-deep py-16 md:py-[90px]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.12em] text-rose-dark">
            <span className="h-0.5 w-5 rounded bg-gold" /> Encomendas
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-tight">Quero fazer uma encomenda</h2>
        </Reveal>

        <Reveal className="grid items-center gap-10 md:grid-cols-2">
          <div className="grid gap-5">
            {PASSOS.map((p, i) => (
              <div key={p.titulo} className="flex items-start gap-4.5">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-rose-dark shadow-sm">
                  <p.icon size={20} />
                </span>
                <div>
                  <h4 className="mb-1 text-[1.05rem] font-semibold">{p.titulo}</h4>
                  <p className="text-sm text-cocoa-soft">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[32px] bg-gradient-to-br from-rose-dark to-rose-deep p-11 text-center text-white shadow-lg">
            <h3 className="font-display mb-2 text-[1.7rem]">Bora garantir sua fatia?</h3>
            <p className="mb-6 text-white/88">Chama agora mesmo, respondo rapidinho!</p>
            <a
              href={whatsappLink}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 py-4 text-[.95rem] font-semibold text-white shadow-[0_10px_26px_rgba(37,211,102,.35)] transition-[background,transform] hover:-translate-y-0.5 hover:bg-whatsapp-dark"
            >
              <WhatsIcon size={20} /> Fazer encomenda pelo WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
