# Plano de Implementação do Site Plasmaster

## Resumo

- Base: `Next.js` com App Router, `TypeScript`, `Tailwind CSS`, `ESLint`, página
  única em PT-BR com navegação por âncoras `#home`, `#sobre`, `#servicos` e
  `#contato`.
- Direção visual via `design-taste-frontend`: layout editorial assimétrico, base
  `zinc/slate` clara, um único acento azul derivado do logo, tipografia `Outfit`
  para UI/headlines e `JetBrains Mono` para métricas, sem glow, sem roxo e sem
  grade genérica de 3 cards.
- Hero obrigatório via `scroll-driven-frame-animation`:
  `MP4 -> FFMPEG -> WebP sequence -> sticky canvas + preload + requestAnimationFrame + IntersectionObserver`,
  com textos em parallax sincronizados ao progresso do scroll.
- Multi-agentes será obrigatório na execução: um worker dono do pipeline de
  frames/hero lendo `scroll-driven-frame-animation`, outro worker dono de
  layout/sections lendo `design-taste-frontend`, e o agente principal integra
  `app/page.tsx`, revisa conflitos e roda verificação.
- Como o repositório ainda não tem app, a regra de “Step 0” não se aplica agora;
  ela só entra se algum arquivo passar de 300 LOC antes de refactor.

## Fases

1. **Fase 1 — Bootstrap de tooling, sem UI final, até 5 arquivos**

- Criar `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts` e
  `eslint.config.mjs`.
- Instalar `next`, `react`, `react-dom`, `typescript`, `@types/*`,
  `tailwindcss`, `@tailwindcss/postcss`, `eslint` e `eslint-config-next`.
- Scripts mínimos: `dev`, `build`, `lint`, `typecheck`.
- Verificação obrigatória ao fim: `npx tsc --noEmit` e `npx eslint . --quiet`.
  Parar e aguardar sua aprovação.

2. **Fase 2 — Casca do app e sistema visual, até 5 arquivos**

- Criar `postcss.config.mjs` e a base em `app/` com `layout`, `page` e
  `globals`.
- Definir tokens visuais, fontes, container, grid, header sticky translúcido,
  footer shell e estrutura de uma homepage one-page já com seções/anchors.
- O `page` nessa fase fica funcional, mas ainda sem hero scroll-driven final.
- Verificação obrigatória: `npx tsc --noEmit`, `npx eslint . --quiet` e
  `npx next build`. Parar e aguardar sua aprovação.

3. **Fase 3 — Pipeline de frames + hero scroll-driven, 5 arquivos de código +
   artefatos gerados**

- Adicionar `scripts/extract-scroll-frames.mjs`, `lib/site-content.ts`,
  `components/scroll-sequence-hero.tsx`, `components/hero-quote-form.tsx` e
  atualizar `app/page.tsx`.
- Pré-requisito explícito antes desta fase: instalar `ffmpeg` e `ffprobe` no
  Windows, porque hoje eles não existem no ambiente.
- O script deve extrair `public/Industrial_animation_assembly.mp4` e
  `public/Industrial_animation_assembly_mobile.mp4` para
  `public/frames/assembly/desktop/` e `public/frames/assembly/mobile/`, gerar
  `public/frames/assembly/manifest.json` e validar contagem/largura/altura ao
  final.
- O hero terá 3 beats de texto com parallax: `Referência nacional...`,
  `Precisão em cada detalhe...`, e
  `Capacidade Técnica / Conheça nossa estrutura`, todos derivados de
  `planejamento/site-copy.md`.
- O canvas será sticky, com preload progressivo, render inicial sem tela vazia,
  `requestAnimationFrame`, `IntersectionObserver`, troca desktop/mobile por
  breakpoint e fallback estático para `prefers-reduced-motion`.
- Verificação obrigatória: rodar o script de extração, conferir manifesto x
  quantidade de frames, depois `npx tsc --noEmit`, `npx eslint . --quiet` e
  `npx next build`. Parar e aguardar sua aprovação.

4. **Fase 4 — Conteúdo principal acima da dobra média, até 5 arquivos**

- Criar `components/site-header.tsx`, `components/proof-strip.tsx`,
  `components/quality-capacity-section.tsx`, `components/services-section.tsx` e
  atualizar `app/page.tsx`.
- A faixa de prova traz `PlasMASTER desde 1997`, `+2.800 horas/mês`, `6 máquinas` e
  `3 moinhos` em linguagem técnica, não em cards genéricos.
- `Qualidade e Dedicação` e `Capacidade Técnica` entram em composição editorial
  de duas colunas; `Serviços` entra em dois blocos grandes e assimétricos, sem
  repetição visual.
- Verificação obrigatória: `npx tsc --noEmit`, `npx eslint . --quiet`,
  `npx next build`. Parar e aguardar sua aprovação.

5. **Fase 5 — Manifesto, diferenciais e contato, até 5 arquivos**

- Criar `components/principles-section.tsx`,
  `components/differentials-section.tsx`, `components/contact-section.tsx`,
  `components/contact-form.tsx` e atualizar `app/page.tsx`.
- `Missão, Visão e Valores` entra como faixa de manifesto limpa;
  `Por que a Plasmaster?` entra como lista editorial de argumentos; `Contato`
  fecha a página com dados reais e formulário UI-only.
- Tanto o form do hero quanto o form de contato terão validação client-side,
  labels acima dos campos, erros inline e mensagem honesta de que o envio real
  ainda não foi integrado.
- Verificação obrigatória: `npx tsc --noEmit`, `npx eslint . --quiet`,
  `npx next build`.

## Interfaces e contratos internos

- `lib/site-content.ts` será a fonte única de conteúdo estruturado, com tipos
  para `navItems`, `heroBeats`, `metrics`, `services`, `principles`,
  `differentials`, `contactDetails` e `footer`.
- `heroBeats` terá contrato explícito com `id`, `eyebrow`, `title`, `body`,
  `start`, `end` e `depth`, para sincronizar parallax sem acoplar texto ao
  índice bruto do frame.
- `public/frames/assembly/manifest.json` terá contrato único com `desktop` e
  `mobile`, cada variante contendo `frameCount`, `fps`, `width`, `height`,
  `posterFrame` e `pathPattern`.
- `ScrollSequenceHero` receberá conteúdo e manifesto; ele próprio resolve
  preload, sticky canvas, progress mapping e fallback de acessibilidade.

## Testes e cenários

- Confirmar que o primeiro frame aparece imediatamente e que nunca existe canvas
  vazio ao entrar na seção.
- Confirmar que o scrub percorre toda a sequência sem redraw redundante, sem
  `scroll jank` e sem usar `clearRect`.
- Confirmar que mobile usa a variante vertical, reduz densidade do overlay e não
  gera scroll horizontal.
- Confirmar que `prefers-reduced-motion` desativa scrub e mostra frame estático
  com copy legível.
- Confirmar que toda a copy vem de `site-copy.md`, sem claims inventados e sem
  caracteres quebrados no render final.
- Confirmar que ambos os formulários validam corretamente, mostram erros inline
  e não simulam envio real.

## Assumptions e defaults

- O site será uma homepage única institucional; não haverá rotas adicionais
  nesta primeira entrega.
- `planejamento/site-copy.md` é a fonte de verdade para texto; se o arquivo
  estiver com encoding inconsistente, a implementação deve normalizá-lo para
  UTF-8 antes de consolidar o conteúdo.
- Os frames extraídos serão commitados em `public/frames/assembly/**` por sua
  escolha; isso é a única exceção planejada ao limite de 5 arquivos por fase, e
  vale apenas para artefatos gerados.
- O hero concentra os textos sobre o vídeo; o restante do conteúdo fica abaixo
  dele, evitando compressão excessiva da narrativa dentro da animação.
