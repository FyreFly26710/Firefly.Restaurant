# Development Plan

This document tracks the delivery sequence for Firefly Restaurant.
It is project guidance for developers and agents before implementation issues are created.

## Current Phase

Initial repository setup.

Success for this phase means the repository guidance, docs, and reusable skills all agree on the project shape before any application scaffold is generated.

## Target Stack

### Web Storefront

- Location: `src/client/web`
- Framework: Next.js App Router with React and TypeScript
- Styling: Tailwind CSS with project design tokens
- Rendering: ISR/static-first pages by default
- Deployment default: Cloudflare Pages first, with a tracked validation risk for ISR support
- Testing: Vitest, Testing Library, and Playwright

### Server, Admin, And API

- Location: `src/server`
- Framework: .NET 10 with ASP.NET Core
- Solution shape: one `.slnx`
- Projects: `user.api`, `user.core`, `menu.api`, `menu.core`, `admin.app`, `gateway.api`, and `common.lib`
- Admin UI: Blazor Server
- Persistence: EF Core with PostgreSQL
- Messaging: RabbitMQ where cross-service communication is needed
- API patterns: MediatR for write paths, explicit query services for reads, Problem Details, and OpenAPI
- Deployment direction: local server behind Cloudflare Tunnel

## Repository Layout

```text
/
  .agents/
    skills/
    scripts/
  docs/
    client/
      web/
    server/
    demo-ui/
  src/
    client/
      web/
      ios/        # future
      android/    # future
    server/
```

Root `AGENTS.md` applies globally.
Each project folder owns local guidance through its own `AGENTS.md`.
Reusable skills stay at the repository root under `.agents/skills`.

## Key Mechanisms

### Static-First Storefront

Public pages should be pre-rendered or revalidated so visitors receive cached HTML from Cloudflare.
Normal public browsing must not call the .NET API directly.
Trusted server-side, build-time, preview, or revalidation paths may call backend endpoints when explicitly documented.

### Revalidation

Admin changes that affect public content should update server state and trigger storefront revalidation.
Timed revalidation remains a safety net when on-demand revalidation fails or is not yet wired.

### Media

Images are uploaded through the admin/server path.
The server processes media into web-friendly formats and exposes cacheable media URLs.
Cloudflare should cache media routes aggressively to reduce local server bandwidth.

### Security

The local server should stay hidden behind Cloudflare Tunnel.
Public API exposure should be avoided unless an issue explicitly documents the need, cache behavior, rate limiting, and abuse protections.

## Roadmap

1. Repository guidance setup
   - Rewrite project docs, local `AGENTS.md` files, and root skills for Firefly Restaurant.
   - Keep `docs/demo-ui` as reference material only.
2. Web storefront foundation
   - Scaffold `src/client/web` with Next.js App Router, TypeScript, Tailwind, tests, and route structure.
   - Port the visual direction from `docs/demo-ui/web` without carrying over demo identity as canonical content.
3. Server foundation
   - Create the .NET 10 `.slnx` under `src/server`.
   - Add the planned API/core/admin/gateway/common projects and baseline tests.
4. Menu and shop content
   - Implement menu and shop content models, admin CRUD, media handling, and public read models.
   - Wire revalidation from admin changes to storefront pages.
5. Cloudflare and local deployment
   - Validate Cloudflare Pages-first deployment for the desired static-first behavior.
   - Record whether Workers/OpenNext is required for the ISR behavior Firefly needs.
6. Future ordering and accounts
   - Add user accounts, ordering, payments, mobile-specific contracts, and mobile clients through separate issues.

## Active Risks

- Cloudflare Pages-first hosting may not satisfy the final ISR requirements. Current Cloudflare guidance points full-stack Next.js ISR support toward Workers with the OpenNext adapter, while Pages is the simpler static site path.
- Microservice boundaries can be overbuilt too early. Start with one solution and explicit project boundaries, then split runtime deployment only when real operational needs justify it.
- Public dynamic behavior can accidentally bypass the static shield. Storefront issues must call out any runtime API dependency explicitly.

## References

- Next.js ISR: https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- Cloudflare Pages Next.js guide: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Cloudflare Workers Next.js guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- OpenNext Cloudflare caching: https://opennext.js.org/cloudflare/caching
