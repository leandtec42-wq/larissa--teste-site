import { getPerfil } from "@/lib/models/perfil";
import { listEventosFuturosAtivos } from "@/lib/models/eventos";
import { listSaboresDisponiveis } from "@/lib/models/sabores";
import { listDepoimentosAtivos } from "@/lib/models/depoimentos";
import { listPublicacoesPublicadas } from "@/lib/models/publicacoes";
import { buildWhatsappLink, fillTemplate } from "@/lib/whatsapp";

import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Sobre from "@/components/site/Sobre";
import ProximoEvento from "@/components/site/ProximoEvento";
import Agenda from "@/components/site/Agenda";
import Novidades from "@/components/site/Novidades";
import Sabores from "@/components/site/Sabores";
import Depoimentos from "@/components/site/Depoimentos";
import Vitrine from "@/components/site/Vitrine";
import Encomendas from "@/components/site/Encomendas";
import Footer from "@/components/site/Footer";
import WhatsappFloat from "@/components/site/WhatsappFloat";

export const revalidate = 0;

export default async function Home() {
  const [perfil, eventos, sabores, depoimentos, publicacoes] = await Promise.all([
    getPerfil(),
    listEventosFuturosAtivos(),
    listSaboresDisponiveis(),
    listDepoimentosAtivos(),
    listPublicacoesPublicadas(),
  ]);

  const whatsappLink = buildWhatsappLink(perfil.whatsapp, fillTemplate(perfil.tplEncomenda, {}));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: perfil.marca,
    image: perfil.fotoCapa,
    description: perfil.descricao,
    address: { "@type": "PostalAddress", addressLocality: perfil.cidade.split(" - ")[0], addressRegion: perfil.cidade.split(" - ")[1], addressCountry: "BR" },
    servesCuisine: "Confeitaria",
    priceRange: "R$$",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-[1000] focus:rounded-br-lg focus:bg-cocoa focus:px-5 focus:py-3 focus:text-white">
        Pular para o conteúdo
      </a>

      <Header whatsappLink={whatsappLink} />

      <main id="conteudo">
        <Hero perfil={perfil} whatsappLink={whatsappLink} />
        <Sobre perfil={perfil} whatsappLink={whatsappLink} />
        <ProximoEvento eventos={eventos} />
        <Agenda eventos={eventos} />
        <Novidades publicacoes={publicacoes} />
        <Sabores sabores={sabores} perfil={perfil} />
        <Depoimentos depoimentos={depoimentos} />
        <Encomendas whatsappLink={whatsappLink} />
        <Vitrine instagramLink={perfil.instagram} />
      </main>

      <Footer perfil={perfil} whatsappLink={whatsappLink} />
      <WhatsappFloat href={whatsappLink} />
    </>
  );
}
