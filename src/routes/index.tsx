import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lines } from "@/components/sections/Lines";
import { About } from "@/components/sections/About";
import { Differentials } from "@/components/sections/Differentials";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Plasmasters | Excelência em Soluções de Embalagens",
      },
      {
        name: "description",
        content:
          "Landing page institucional com portfólio completo de plásticos flexíveis, proteção e logística e embalagens rígidas.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Lines />
        <About />
        <Differentials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
