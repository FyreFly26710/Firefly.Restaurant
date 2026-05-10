# Web Storefront AGENTS.md

## Area Role

This folder owns the Firefly Restaurant public web storefront.
Use this guidance with the root `AGENTS.md`, `docs/architecture.md`, `docs/development-plan.md`, and `docs/client/web/README.md`.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Vitest, Testing Library, and Playwright
- Cloudflare Pages-first deployment, with Workers/OpenNext tracked as an ISR validation risk

## Architecture Expectations

- Keep `app/` route, layout, loading, error, and metadata files thin.
- Put feature-owned behavior under `src/features`.
- Put shared pure UI under `src/components`.
- Put cross-feature helpers under `src/lib`.
- Keep server-side storefront data access behind typed modules.
- Use client components only when browser interactivity requires them.
- Prefer local state until state must cross routes or features.
- Use Zustand only for genuinely client-owned shared state.
- Do not put server data in Zustand.

## Static-First Contract

- Public storefront routes should be static, ISR, or otherwise CDN-cacheable by default.
- Normal public browsing must not call the .NET API directly from the browser.
- Backend access belongs in trusted build-time, server-side, preview, or revalidation paths unless an issue explicitly documents an exception.
- If a change adds browser-side API calls, document why static-first behavior is insufficient and describe caching, auth, rate limiting, and failure states.
- Admin-triggered public content changes should be compatible with path or tag revalidation.

## Design Reference

- Use `docs/demo-ui/web` as UX and visual reference.
- Do not treat demo sample names, copy, or data as canonical product content.
- Preserve the restaurant-specific design quality while replacing placeholder identity with Firefly product content when product docs define it.

## Testing And Validation

Use project scripts once the storefront is scaffolded.
Expected checks:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

When Cloudflare behavior matters, run the configured Cloudflare preview command after it exists and record Pages versus Workers/OpenNext findings in the issue or docs.
