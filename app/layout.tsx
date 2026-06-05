import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import SiteLoadingScreen from "../components/site-loading-screen";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plasmaster | Injecao de termoplasticos",
  description:
    "Desde 1997, a PlasMASTER entrega injecao de termoplasticos com precisao tecnica, qualidade certificada e capacidade produtiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${jetBrainsMono.variable} min-h-[100dvh] overflow-x-clip bg-[var(--surface)] text-[var(--ink)] antialiased`}
      >
        <SiteLoadingScreen />
        <a href="#home" className="skip-link">
          Ir para o conteudo
        </a>
        {children}
      </body>
    </html>
  );
}
