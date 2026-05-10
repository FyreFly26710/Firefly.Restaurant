---
name: frontend-patterns
description: Firefly Restaurant Next.js storefront patterns. Use when adding, changing, or reviewing web client code under src/client/web, including App Router structure, static-first data access, Tailwind styling, forms, state, and tests.
---

# Frontend Patterns

Use this skill for storefront work under `src/client/web/`.
Local `AGENTS.md` files, project docs, and existing code patterns take precedence.

## Default Stack

- Next.js App Router with React and TypeScript
- Tailwind CSS for layout, spacing, typography, responsive behavior, and design tokens
- Static rendering and ISR for public content by default
- Vitest and Testing Library for unit/component tests
- Playwright for route smoke tests and critical journeys
- Zustand only for client-owned shared state when local state is not enough

## Folder Structure

Prefer this shape after the storefront is scaffolded:

```text
src/client/web/
  app/                    # Next.js route segments, layouts, metadata, loading, error
  src/
    components/           # Shared pure UI that no single feature owns
    features/             # Primary storefront feature boundary
      <feature>/
        components/
        hooks/
        lib/
        mappers/
        store/
        types/
        views/
    lib/
      env.ts
      http/
      revalidation/
      server-data/
    test/
      render.tsx
      setupTests.ts
  tests/
    e2e/
```

## Boundary Rules

- Keep `app/` route files thin; parse route params, define metadata, and render feature views.
- Feature behavior belongs inside the feature folder that owns it.
- Shared UI belongs in `src/components` only when reuse is real.
- Cross-feature framework helpers belong in `src/lib`.
- Keep transport DTOs, view models, and form models distinct.
- Do not move business behavior into route files.

## Static-First Data Access

Public storefront pages should be static, ISR, or otherwise CDN-cacheable.
Normal public browsing must not call the .NET API directly from browser code.

Use server-side, build-time, preview, or revalidation-safe modules for backend reads.
If a feature needs browser-side runtime data, the issue must document why, plus cache behavior, auth, rate limiting, and failure states.

Prefer Next.js cache primitives for public content:

- route segment `revalidate` values for time-based ISR,
- tagged `fetch` calls for content groups,
- `revalidatePath` or `revalidateTag` for admin-triggered changes,
- explicit `cache: "no-store"` only for routes that are intentionally dynamic.

## State Management

- Keep local UI state local.
- Use URL state for shareable filters and route-relevant selections.
- Use Zustand for client-owned state that spans routes or independent components.
- Do not store server entities or public content cache in Zustand.
- Use server components and cached data where client interactivity is not needed.

## Forms And Mutations

- Keep public guest forms explicit about whether they are static, server action based, or browser API based.
- Use progressive enhancement where practical.
- Keep validation close to the form or server action that owns it.
- Document any mutation that needs storefront revalidation.

## Styling

- Use Tailwind and project tokens.
- Keep the visual direction restaurant-specific and polished.
- Use `docs/demo-ui/web` as UX reference, not as product identity.
- Avoid one-off styling systems unless the project has adopted them.

## Testing

- Use Vitest for pure logic, mappers, hooks, and component behavior.
- Use Playwright for route smoke tests, navigation, and critical browser journeys.
- Prefer accessible queries and visible outcomes.
- Mock backend access at the server-data or transport boundary.

## What Not To Do

- Do not add a separate frontend framework or router.
- Do not introduce browser-side .NET API calls for normal browsing without explicit issue scope.
- Do not treat `docs/demo-ui` as production code.
- Do not add Axios by default.
- Do not put server data into Zustand.
