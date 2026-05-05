import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import SmoothScroll from "../components/smooth-scroll";
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
    "Desde 2005, em Joinville, a Plasmaster entrega injecao de termoplasticos com precisao tecnica, qualidade certificada e capacidade produtiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} ${jetBrainsMono.variable} min-h-[100dvh] overflow-x-clip bg-[var(--surface)] text-[var(--ink)] antialiased`}
      >
        <SmoothScroll />
        <a href="#home" className="skip-link">
          Ir para o conteudo
        </a>
        {children}
      </body>
    </html>
  );
}
