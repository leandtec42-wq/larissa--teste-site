import localFont from "next/font/local";
import "./globals.css";
import { getPerfil } from "@/lib/models/perfil";

// Fontes variáveis (subset latin — cobre todos os acentos do português),
// guardadas em app/fonts. Servidas do próprio site: sem depender do Google
// na hora do build e sem requisição externa para quem visita.
const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    { path: "./fonts/playfair-display-latin.woff2", style: "normal", weight: "500 800" },
    { path: "./fonts/playfair-display-italic-latin.woff2", style: "italic", weight: "500 800" },
  ],
});

const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [{ path: "./fonts/outfit-latin.woff2", style: "normal", weight: "300 700" }],
});

// Letra manuscrita usada só em pequenos toques ("feito à mão…").
const caveat = localFont({
  variable: "--font-caveat",
  display: "swap",
  src: [{ path: "./fonts/caveat-latin.woff2", style: "normal", weight: "600 700" }],
});

export async function generateMetadata() {
  const perfil = await getPerfil();
  const title = `${perfil.marca} | Confeitaria artesanal em ${perfil.cidade}`;
  const description = perfil.frase;
  return {
    title,
    description,
    metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
    openGraph: {
      title,
      description,
      images: [perfil.fotoCapa],
      locale: "pt_BR",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport = {
  themeColor: "#24081a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${outfit.variable} ${caveat.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
