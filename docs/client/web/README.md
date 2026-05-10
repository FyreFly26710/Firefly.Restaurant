# Web Storefront Guidance

This folder contains project guidance for `src/client/web`.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Vitest and Testing Library
- Playwright for browser smoke and critical journeys

## Rendering And Caching

The storefront is static-first.
Use static rendering and ISR for public pages wherever possible.
Public routes should be safe for Cloudflare CDN caching and should not require browser-side calls to the .NET API during normal browsing.

Use trusted server-side, build-time, preview, or revalidation paths for backend reads.
If an issue needs browser-side runtime data, document the API exposure, cache behavior, rate limiting, and failure states.

## Cloudflare Deployment

The project starts with Cloudflare Pages as the preferred deployment target.
The intended future workflow is `.github/workflows/cd-web.yml`, but it should not be created until the storefront scaffold exists.

Known risk: current Cloudflare documentation points full-stack Next.js ISR support toward Workers with the OpenNext adapter, while Pages is the simple static site path.
Before production launch, validate whether Cloudflare Pages satisfies Firefly's ISR and on-demand revalidation needs.

For the initial Pages-first path:

- build from `src/client/web`,
- upload static output to Cloudflare Pages with Wrangler,
- keep public routes cacheable by Cloudflare,
- avoid browser-side .NET API calls during normal public browsing,
- use deploy hooks or workflow dispatch for admin-triggered public content updates.

If a storefront issue requires true runtime ISR or on-demand `revalidatePath` or `revalidateTag`, document the Workers/OpenNext pivot before changing deployment.

## Design Reference

Use `docs/demo-ui/web` for UX direction, interaction ideas, and visual tone.
Do not copy the demo restaurant identity as canonical Firefly content.

## Validation

Use project scripts once the storefront is scaffolded.
Expected checks:

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

When Cloudflare behavior matters, also run the configured Cloudflare preview command after it exists.
