# Revisão Profissional Web - Design

Data: 2026-05-04
Projeto: NovaSprint Academy
Escopo: Refinamento incremental da landing page estática para melhorar percepção de qualidade, acessibilidade, responsividade e prontidão para deploy na Vercel, sem reescrever a base.

## Objetivo

Elevar a landing page atual a um padrão mais profissional de portfólio, preservando a identidade visual e a proposta de produto educacional, enquanto corrige problemas de conteúdo, consistência visual e estrutura operacional.

## Estado Atual

- Projeto estático com `index.html`, `src/styles/main.css` e `src/scripts/main.js`.
- Não existe `package.json`, fluxo de build, diretório de saída ou configuração mínima para deploy previsível na Vercel.
- Há texto com encoding corrompido em HTML, JavaScript e README.
- O layout funciona conceitualmente, mas ainda parece protótipo em alguns trechos por falta de consistência tipográfica, rítmica e de acabamento.
- Acessibilidade existe em partes, porém o modal, os estados dinâmicos e o teclado ainda precisam de revisão mais rigorosa.

## Direção Técnica

O projeto continuará estático. Não haverá migração para React, Vite, Next.js ou outra stack. A evolução será feita sobre a base existente, com estas metas:

1. Manter `index.html` como ponto de entrada.
2. Manter CSS e JavaScript centralizados em `src/styles/main.css` e `src/scripts/main.js`.
3. Adicionar um fluxo mínimo com `npm run dev` e `npm run build` para servir e empacotar o site de forma consistente.
4. Produzir saída estática pronta para hospedar na Vercel.

## Direção Visual

O refinamento seguirá a identidade já presente: base clara, atmosfera suave, contraste escuro no conteúdo e acentos vibrantes em azul e verde-lima.

As mudanças visuais devem:

- reforçar a hierarquia entre hero, seções e CTAs;
- estabilizar espaçamentos, raios, bordas, sombras e densidade;
- melhorar legibilidade de títulos e corpo;
- tornar cards e superfícies mais coesos entre si;
- reduzir motion decorativo excessivo;
- preservar a sensação de landing page de produto educacional premium, evitando aparência genérica.

## Componentes e Áreas de Intervenção

### Header

- Melhorar alinhamento, equilíbrio visual e comportamento responsivo.
- Preservar a navegação simples, sem introduzir menu complexo desnecessário.

### Hero

- Refinar hierarquia do `eyebrow`, título, parágrafo e ações.
- Ajustar a composição entre texto e card de comunidade para melhorar leitura e equilíbrio em mobile e desktop.

### Community Card

- Melhorar contraste, microcopy e comportamento dos avatares.
- Manter a interação contextual, mas sem depender apenas de hover.

### Slot Section

- Melhorar enquadramento visual do contador e suporte de acessibilidade para conteúdo dinâmico.

### Roadmap

- Tornar checkpoints, barra de progresso e painel de detalhe mais consistentes.
- Melhorar estados ativo, hover e foco.

### Code Lab

- Preservar o conceito do mini editor, mas com melhor acabamento visual e distribuição espacial.

### Certificates

- Reduzir a sensação de blocos vazios.
- Controlar melhor animações, estados interativos e conteúdo do modal.

### Oferta Final

- Reequilibrar título, countdown e mensagem.
- Tratar urgência visual sem ruído excessivo.

## Acessibilidade

As melhorias devem incluir:

- correção dos textos corrompidos;
- landmarks e rotulagem coerentes;
- foco visível consistente;
- suporte real para teclado nas interações principais;
- modal com abertura, fechamento e retorno de foco corretos;
- uso apropriado de `aria-live` nas regiões dinâmicas;
- verificação de contraste próxima de WCAG AA;
- redução de motion respeitando `prefers-reduced-motion`.

## Estrutura e Organização

Serão introduzidos apenas os diretórios necessários ao novo fluxo:

```text
docs/
  desktop.png
  mobile.png
  superpowers/specs/
index.html
package.json
src/
  assets/
  scripts/
  styles/
```

Não haverá refatoração artificial para múltiplos componentes porque a base atual é pequena e estática. A organização permanecerá simples e proporcional ao tamanho do projeto.

## Build e Deploy

Será adicionado um fluxo mínimo para:

- servir localmente com `npm run dev`;
- gerar artefato estático com `npm run build`;
- publicar na Vercel sem dependência de framework.

Se necessário, o build copiará os arquivos públicos para um diretório de saída como `dist/`.

## Documentação

O `README.md` será reescrito com:

- descrição mais profissional;
- stack real do projeto;
- previews desktop e mobile;
- estrutura de pastas;
- instruções reais de execução e build;
- melhorias futuras plausíveis;
- autor genérico, sem exposição de dados pessoais.

## Critérios de Aceite

O trabalho será considerado pronto quando:

1. O conteúdo textual estiver limpo e legível.
2. O site estiver visualmente mais consistente em 320px, 768px e 1440px+.
3. As principais interações funcionarem por mouse e teclado.
4. `npm run dev` funcionar localmente.
5. `npm run build` gerar saída sem falhas.
6. O README estiver alinhado com a implementação real.

## Fora de Escopo

- Migração para framework SPA/SSR.
- CMS, painel administrativo ou back-end.
- Refatoração excessiva da estrutura atual.
- Inclusão de animações novas apenas por efeito visual.
