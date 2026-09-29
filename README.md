# rhobound-web

Marketing site for Rhobound. Next.js (App Router), static, no external UI libraries.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before launch

Edit `site.config.ts`: contact email, book-a-call link, GitHub URL. Empty values hide their buttons and links.

## Where things live

- `app/page.tsx` – page structure
- `lib/content.ts` – all copy, sourced figures (with links), results, integrations, roadmap, FAQ
- `lib/model.ts` – the queueing model behind the hero simulator (reference 12-service system)
- `components/Simulator.tsx` – interactive traffic slider and chart
- `app/globals.css` – design tokens (light and dark) and styles

Content rules come from `info_for_website.md` §0: accuracy numbers are simulation-only and must say so, mean latency not p99, no "open source" claim, no pricing.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js defaults.
3. Add the custom domain under **Settings → Domains**.

Or from the terminal: `npx vercel` (preview), then `npx vercel --prod`.
