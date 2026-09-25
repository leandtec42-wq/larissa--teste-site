import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import InstagramIcon from "./InstagramIcon";

const FOTOS = [
  { src: "/media/evento-carro-bolos.jpg", alt: "Equipe preparando as tortas em uma feira, com bandejas cheias de fatias" },
  { src: "/media/bolo-personalizado-dourado.jpg", alt: "Bolo personalizado com tema Frozen, cupcakes e decoração de balões azuis" },
  { src: "/media/evento-mesa-vermelha.jpg", alt: "Mesa de feira com bandejas de tortas de sabores variados" },
  { src: "/media/bolo-personalizado-rosa.jpg", alt: "Bolo rosa de camadas decorado com babados e corações de chantilly" },
  { src: "/media/evento-vitrine-morango.jpg", alt: "Equipe servindo fatias na vitrine durante a feira" },
  { src: "/media/mini-bolos.jpg", alt: "Bolo amarelo decorado com chantilly e a frase Thank you God, for this day" },
  { src: "/media/evento-carro-bolos-2.jpg", alt: "Equipe atendendo clientes na feira, com tortas à frente" },
  { src: "/media/bolo-personalizado-nicolas.jpg", alt: "Bolo retangular em cores pastel com nomes e datas em chantilly" },
];

/** Galeria em duas faixas de fotos que correm em sentidos opostos. */
export default function Vitrine({ instagramLink }) {
  const metade = Math.ceil(FOTOS.length / 2);
  const faixas = [
    { fotos: FOTOS.slice(0, metade), classe: "animate-marquee" },
    { fotos: FOTOS.slice(metade), classe: "animate-marquee-reverse" },
  ];

  return (
    <section id="vitrine" className="relative overflow-hidden bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          center
          eyebrow="Vitrine"
          title={<>Um gostinho de como tudo <span className="italic text-gradient-berry">acontece</span></>}
          subtitle="Bastidores, feiras e encomendas especiais — tudo feito com o mesmo carinho."
        />
      </div>

      <div className="grid gap-4 md:gap-6" role="group" aria-label="Galeria de fotos">
        {faixas.map((faixa, f) => (
          <div key={f} className="group/faixa overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className={`${faixa.classe} flex w-max hover:[animation-play-state:paused]`}>
              {[0, 1, 2, 3].map((copia) => (
                <ul key={copia} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6" aria-hidden={copia > 0 ? "true" : undefined}>
                  {faixa.fotos.map((foto, i) => (
                    <li
                      key={foto.src}
                      className={`h-[230px] w-[190px] shrink-0 overflow-hidden rounded-[28px] shadow-[0_24px_44px_-24px_rgba(58,15,44,.55)] transition-transform duration-500 hover:z-10 hover:scale-[1.04] hover:rotate-0 sm:h-[300px] sm:w-[240px] md:h-[340px] md:w-[270px] ${
                        (i + f) % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
                      }`}
                    >
                      <img src={foto.src} alt={copia === 0 ? foto.alt : ""} loading="lazy" draggable="false" className="h-full w-full object-cover" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Reveal className="mt-14 text-center">
        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <InstagramIcon size={20} /> Ver mais no Instagram
        </a>
      </Reveal>
    </section>
  );
}
