# Deploy — MIDIAFIX Comunicação Visual

Guia de publicação da landing na **Vercel**. Projeto estático (HTML/CSS/JS), **sem build**.

_Última atualização: 2026-05-25._

---

## 1. Status atual do projeto

| Área | Estado |
|---|---|
| Estrutura | Estático puro (HTML + CSS + JS), sem dependências de build |
| Homepage | `midiafix-comunicacao-visual.html` (servida em `/` via `vercel.json`) |
| Tokens/Componentes | `assets/css/tokens.css` + `assets/css/components.css` (fonte única) |
| JS compartilhado | `assets/js/ui.js` (reveal, accordion, nav-scroll) |
| Imagens | Otimizadas: **~7,5 MB → ~1,2 MB** (JPEG q82, redimensionadas) |
| CTAs | Todos → WhatsApp `https://wa.me/554530390303` |
| Contato | tel `+55 45 3039-0303` · `vendas3@midiafix.com.br` · Instagram · LinkedIn |
| SEO | canonical, Open Graph, Twitter Card, JSON-LD (LocalBusiness), favicon, theme-color |
| Indexação | `robots.txt` + `sitemap.xml` |
| Páginas internas | Fora do deploy (`.vercelignore`) + `noindex` |

---

## 2. Checklist final aprovado

- [x] Homepage = landing (rewrite no `vercel.json`)
- [x] Páginas técnicas fora do deploy (`.vercelignore`) + `noindex`
- [x] CTAs → WhatsApp; telefone/e-mail/redes reais
- [x] Links de rodapé resolvidos (sem placeholders, exceto a logo → topo)
- [x] Menu por âncoras funcionando, sem âncora quebrada
- [x] Responsividade: sem overflow horizontal (mobile/tablet/desktop)
- [x] SEO técnico: canonical, OG, Twitter, JSON-LD, favicon, apple-touch-icon, theme-color
- [x] `robots.txt` + `sitemap.xml`
- [x] Performance: imagens ~1,2 MB, `lazy` nas secundárias, `preload` do hero

---

## 3. Instruções de deploy na Vercel

### Opção A — Git (recomendado)
1. Versionar e enviar:
   ```bash
   git init
   git add .
   git commit -m "MIDIAFIX landing - pronto para deploy"
   git branch -M main
   git remote add origin <URL-do-repo>
   git push -u origin main
   ```
2. Em **vercel.com → Add New → Project → Import** o repositório.
3. Configurações de build:
   - **Framework Preset:** `Other`
   - **Build Command:** _(vazio)_
   - **Output Directory:** _(vazio / raiz)_
   - **Install Command:** _(vazio)_
4. **Deploy.** Cada `git push` na `main` republica automaticamente.

### Opção B — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel            # preview
vercel --prod     # produção
```
> Respeita o `.vercelignore`.

### Opção C — Drag-and-drop (dashboard)
Arrastar a pasta na Vercel. **Ressalva:** o drag-drop **não respeita o `.vercelignore`** — as páginas internas iriam junto (ainda com `noindex`, mas acessíveis por URL). **Prefira Git ou CLI.**

### Domínio
1. Projeto → **Settings → Domains → Add** `midiafix.com.br` (e `www`).
2. DNS conforme a Vercel indicar (geralmente: apex → registro **A**; `www` → **CNAME** `cname.vercel-dns.com`).
3. SSL automático após propagação.

---

## 4. Observação sobre o `vercel.json`

```json
{
  "rewrites": [
    { "source": "/", "destination": "/midiafix-comunicacao-visual.html" }
  ]
}
```
- Faz `/` servir a **landing** (a URL permanece limpa: `/`).
- Os assets resolvem normalmente (`/assets/...`) e as âncoras (`#solucao`, etc.) funcionam.
- O preview local (`.claude/serve.ps1`) **ignora** o `vercel.json` — localmente `/` é o hub; o rewrite vale só na Vercel.

---

## 5. Observação sobre páginas técnicas (noindex)

As páginas internas **não vão para produção** via `.vercelignore`:
- `index.html` (hub), `midiafix-design-system.html`, `midiafix-seo-geo-arquitetura.html`, `midiafix-hero-final.html`.

Como defesa adicional, todas têm `<meta name="robots" content="noindex, nofollow">`. No deploy via **Git/CLI** elas retornam **404**; via drag-drop ficam acessíveis por URL, mas fora dos buscadores.

---

## 6. Pendências não bloqueantes

- **Links temporários** "Serviços" e "Sobre a MIDIAFIX" → `#solucao` (âncora interna). Trocar por páginas reais quando existirem.
- **"Carreiras"** removido do rodapé (sem página). Readicionar quando houver.
- **"Política de Privacidade · Termos de Uso"**: hoje é texto no rodapé (não link). Criar páginas se houver exigência legal.
- **WebP/AVIF**: economizaria ~25–30% extra nas imagens (hoje em JPEG). Opcional — exige ferramenta de conversão (`cwebp`).

---

## 7. Próximos passos pós-publicação

1. **Verificar em produção:**
   - `https://midiafix.com.br/` abre a landing
   - CTAs abrem o WhatsApp; telefone/e-mail/redes funcionam
   - `/robots.txt` e `/sitemap.xml` carregam
   - Páginas internas → 404 (Git/CLI)
2. **Open Graph:** validar no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) e [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
3. **Dados estruturados:** validar o JSON-LD em [Rich Results Test](https://search.google.com/test/rich-results).
4. **Google Search Console:** adicionar a propriedade e **enviar o `sitemap.xml`**.
5. **Lighthouse** (Chrome DevTools) em produção para conferir performance/SEO/acessibilidade.
