import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { getPerfil } from "@/lib/models/perfil";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  themeColor: "#e8a6b8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
