import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, MessageCircle, PackageOpen, Package } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  component: ProductsPage,
  head: () => ({
    meta: [
      {
        title: "Catálogo de Produtos | Plasmasters",
      },
      {
        name: "description",
        content: "Consulte nosso catálogo completo de etiquetas, rótulos e ribbons industriais de alta performance.",
      },
    ],
  }),
});

const plasmasterProducts = [
  { id: 1, name: "Etiqueta Transparente Retangular 33x22/3 com Tarja", category: "etiquetas", details: "Rolo com 3 carreiras e tarja preta de leitura sensorial.", code: "PM-001" },
  { id: 2, name: "Ribbon Dourado 30x300 para Fita de Cetim (Feliz Páscoa)", category: "ribbons", details: "Película ouro para impressão em fitas escuras.", code: "PM-002" },
  { id: 3, name: "Etiquetas Adesivas Vigilância Sanitária 60x40 mm Couchê", category: "etiquetas", details: "Milheiro padrão para adequação de normas sanitárias.", code: "PM-003" },
  { id: 4, name: "Etiqueta Transparente Retangular 50x30/2 com Tarja", category: "etiquetas", details: "Bobina com 2 carreiras e marcação óptica traseira.", code: "PM-004" },
  { id: 5, name: "Ribbon Dourado 30x300 para Fita de Cetim (D'or Prestige)", category: "ribbons", details: "Película metálica ouro de alta definição para fitas finas.", code: "PM-005" },
  { id: 6, name: "Ribbon Resina 110x74 Dourado (Brilhante)", category: "ribbons", details: "Fita de resina ouro para alta durabilidade e acabamento espelhado.", code: "PM-006" },
  { id: 7, name: "Etiqueta Transparente Retangular 50x30/2 (Verso com Tarja)", category: "etiquetas", details: "Destaque para o espaçamento de tarja preta industrial no liner.", code: "PM-007" },
  { id: 8, name: "Ribbon Inkanto Misto (Wax Resin) - Preto", category: "ribbons", details: "Fita mista preta para impressões industriais duráveis.", code: "PM-008" },
  { id: 9, name: "Etiquetas Adesivas Selo Frágil 100x50 mm Milheiro", category: "etiquetas", details: "Adesivo Couchê vermelho de alerta para embalagens.", code: "PM-009" },
  { id: 10, name: "Ribbon Inkanto Cera (Wax) - Preto", category: "ribbons", details: "Fita de cera econômica ideal para códigos de barras logísticos.", code: "PM-010" },

  { id: 11, name: "Etiqueta Transparente Retangular 33x22/3 (Bobina Horizontal)", category: "etiquetas", details: "Variação de rebobinamento horizontal para rotuladoras automáticas.", code: "PM-011" },
  { id: 12, name: "Ribbon Resina 110x74 Dourado (Acompanha Selo 'Love')", category: "ribbons", details: "Película homologada para impressão de lacres redondos metalizados.", code: "PM-012" },
  { id: 13, name: "Ribbon Dourado 30x300 (Fita 'Seja Doce como Chocolate')", category: "ribbons", details: "Excelente fixação em fitas de cetim personalizadas para docerias.", code: "PM-013" },
  { id: 14, name: "Ribbon Misto 110x74 Dourado para Fita de Cetim (Kit 3 Rolos)", category: "ribbons", details: "Pack industrial de ribbons ribbons metálicos de média largura.", code: "PM-014" },
  { id: 15, name: "Etiquetas de Voltagem Identificação 110V (Rolo Compacto)", category: "etiquetas", details: "Adesivos amarelos para marcação rápida de maquinários.", code: "PM-015" },
  { id: 16, name: "Etiquetas Adesivas de Identificação 110V Tomadas - 1 Milheiro", category: "etiquetas", details: "Cartela e rolo completo para padronização elétrica predial.", code: "PM-016" },
  { id: 17, name: "Ribbon Resina 110x74 Dourado (Rolo Vertical)", category: "ribbons", details: "Bobinamento padrão para impressoras térmicas de mesa (Zebra, Argox).", code: "PM-017" },
  { id: 18, name: "Etiqueta Gôndola Amarela 75x35 mm Couchê Adesiva", category: "etiquetas", details: "Etiqueta sem adesivo central/total para precificação em calhas.", code: "PM-018" },
  { id: 19, name: "Etiquetas de Validade para Alimentos 40x40 mm Couchê", category: "etiquetas", details: "Campos para preenchimento manual de lote e controle interno.", code: "PM-019" },
  { id: 20, name: "Etiquetas Vigilância Sanitária 60x40 mm (Rolo Vertical)", category: "etiquetas", details: "Disposição vertical para fácil aplicação manual em cozinhas.", code: "PM-020" },

  { id: 21, name: "Ribbon Misto 110x74 Dourado (Fita Branca D'or Prestige)", category: "ribbons", details: "Fórmula especial que evita borrões em fitas de cetim brancas.", code: "PM-021" },
  { id: 22, name: "Etiqueta Frágil Selo 'Este Lado Para Cima' 100x100 mm", category: "etiquetas", details: "Sinalização quadrada de grande porte com setas indicativas de fluxo.", code: "PM-022" }
];

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "etiquetas" | "ribbons">("all");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (code: string) => {
    setFailedImages((prev) => ({ ...prev, [code]: true }));
  };

  const filteredProducts = useMemo(() => {
    return plasmasterProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.details.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-20">
      <Header />

      <main className="flex-grow container-landing pt-12 pb-20">
        {/* Header da Página */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Catálogo Plasmaster
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
            Gerenciamento e consulta de bobinas de etiquetas, rótulos e ribbons industriais
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-3xl border border-border/60 shadow-sm backdrop-blur-sm">
          {/* Barra de Busca */}
          <div className="relative flex-grow max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                categoryFilter === "all"
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setCategoryFilter("etiquetas")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                categoryFilter === "etiquetas"
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Etiquetas
            </button>
            <button
              onClick={() => setCategoryFilter("ribbons")}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                categoryFilter === "ribbons"
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              Ribbons Premium
            </button>
          </div>
        </div>

        {/* Listagem de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isEtiqueta = product.category === "etiquetas";
              
              // Dynamic category badge styling (emerald/amber for etiquetas, violet/indigo for ribbons)
              const badgeClass = isEtiqueta
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-violet-50 text-violet-700 border border-violet-200";
              
              const badgeLabel = isEtiqueta ? "Etiquetas" : "Ribbon";
              const hasImageFailed = failedImages[product.code];

              return (
                <div
                  key={product.id}
                  className="group border border-border bg-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Floating Image Container */}
                    <div className="relative w-full h-48 bg-slate-50/60 rounded-2xl overflow-hidden flex items-center justify-center mb-4 border border-border/40 transition-colors group-hover:border-primary/20">
                      {!hasImageFailed ? (
                        <img 
                          src={`/products/${product.code.toLowerCase()}.jpeg`} 
                          alt={product.name}
                          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          onError={() => handleImageError(product.code)}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors group-hover:text-primary/60">
                          <Package className="h-10 w-10 stroke-[1.2] transition-transform duration-500 group-hover:scale-110" />
                          <span className="text-2xs font-medium uppercase tracking-wider font-mono">Sem Foto</span>
                        </div>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-display font-semibold text-lg text-navy leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    {/* Product Details */}
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {product.details}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-2xs text-muted-foreground font-mono">
                      CÓD: {product.code}
                    </span>
                    <a
                      href={`https://wa.me/5511996411512?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20para%20o%20produto%20da%20Plasmaster:%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 text-xs font-semibold transition-colors duration-200"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Orçamento
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-3xl border border-border/60 shadow-sm">
            <PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce" />
            <h3 className="text-lg font-medium text-slate-700">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
