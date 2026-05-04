# Web Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar a landing page estática com melhorias visuais, acessibilidade, fluxo profissional de dev/build para Vercel e um README mais completo.

**Architecture:** O projeto permanecerá estático, com `index.html` como entrada e assets em `src/`. O build será mínimo, gerando uma saída estática em `dist/` por meio de um script Node simples, sem migrar para framework. As mudanças visuais e comportamentais serão incrementais sobre os arquivos existentes.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Node.js, npm

---

## File Structure

- Modify: `C:\workspace\collection\site-7-bootcamp\index.html`
- Modify: `C:\workspace\collection\site-7-bootcamp\src\styles\main.css`
- Modify: `C:\workspace\collection\site-7-bootcamp\src\scripts\main.js`
- Create: `C:\workspace\collection\site-7-bootcamp\package.json`
- Create: `C:\workspace\collection\site-7-bootcamp\scripts\build.mjs`
- Create: `C:\workspace\collection\site-7-bootcamp\vercel.json`
- Modify: `C:\workspace\collection\site-7-bootcamp\README.md`
- Create: `C:\workspace\collection\site-7-bootcamp\docs\desktop.png`
- Create: `C:\workspace\collection\site-7-bootcamp\docs\mobile.png`

### Task 1: Ajustar estrutura e conteúdo do HTML

**Files:**
- Modify: `C:\workspace\collection\site-7-bootcamp\index.html`

- [ ] **Step 1: Corrigir encoding e microcopy do documento**

Atualizar textos corrompidos e padronizar mensagens principais.

- [ ] **Step 2: Melhorar semântica e acessibilidade estrutural**

Adicionar atributos como skip link, landmarks complementares, rótulos descritivos e suporte melhor ao modal e às regiões dinâmicas.

- [ ] **Step 3: Refinar a marcação de seções críticas**

Ajustar hero, roadmap, cards e oferta para melhor hierarquia visual e leitura sem alterar a proposta da página.

### Task 2: Refinar o sistema visual no CSS

**Files:**
- Modify: `C:\workspace\collection\site-7-bootcamp\src\styles\main.css`

- [ ] **Step 1: Consolidar tokens visuais**

Revisar variáveis globais de cor, tipografia, espaçamento, sombras, superfícies e foco.

- [ ] **Step 2: Melhorar composição e responsividade**

Refinar header, hero, grids, cards e oferta para 320px, 768px e 1440px+.

- [ ] **Step 3: Reduzir motion decorativo e fortalecer estados**

Manter apenas transições úteis, melhorar hover/focus/active e preservar `prefers-reduced-motion`.

### Task 3: Corrigir comportamentos no JavaScript

**Files:**
- Modify: `C:\workspace\collection\site-7-bootcamp\src\scripts\main.js`

- [ ] **Step 1: Corrigir strings e robustez dos elementos dinâmicos**

Normalizar textos, reduzir dependência de elementos implícitos e proteger acessos no DOM.

- [ ] **Step 2: Melhorar acessibilidade das interações**

Implementar retorno de foco no modal, estados descritivos em regiões dinâmicas e suporte melhor a teclado.

- [ ] **Step 3: Revisar timers e animações**

Evitar trabalho desnecessário em loop e manter comportamento previsível com motion reduzido.

### Task 4: Adicionar fluxo profissional de dev/build

**Files:**
- Create: `C:\workspace\collection\site-7-bootcamp\package.json`
- Create: `C:\workspace\collection\site-7-bootcamp\scripts\build.mjs`
- Create: `C:\workspace\collection\site-7-bootcamp\vercel.json`

- [ ] **Step 1: Criar scripts npm reais**

Adicionar `npm run dev` para servir localmente e `npm run build` para gerar `dist/`.

- [ ] **Step 2: Implementar build estático**

Copiar `index.html` e `src/` para `dist/`, garantindo uma saída previsível para deploy.

- [ ] **Step 3: Adicionar configuração da Vercel**

Apontar a publicação para a saída estática correta.

### Task 5: Enriquecer README e gerar previews

**Files:**
- Modify: `C:\workspace\collection\site-7-bootcamp\README.md`
- Create: `C:\workspace\collection\site-7-bootcamp\docs\desktop.png`
- Create: `C:\workspace\collection\site-7-bootcamp\docs\mobile.png`

- [ ] **Step 1: Reescrever o README**

Documentar proposta, stack real, instruções de execução, build, deploy, acessibilidade, estrutura e melhorias futuras.

- [ ] **Step 2: Capturar screenshots finais**

Gerar previews desktop e mobile do resultado final para o README.

- [ ] **Step 3: Validar o fluxo completo**

Executar `npm run build`, testar localmente e revisar os artefatos finais.
