---
name: frontend-tdd-workflow
description: Firefly Restaurant frontend TDD workflow for the Next.js storefront under src/client/web. Use when writing storefront features, fixing UI bugs, refactoring views/hooks/state, or adding Vitest and Playwright coverage.
---

# Frontend TDD Workflow

Use this skill with `frontend-patterns` whenever storefront behavior changes.

## Test Placement

| Layer | Default location | Runner |
|---|---|---|
| Pure logic, mappers, helpers | Colocated `*.test.ts` | Vitest |
| Zustand stores | Colocated `*.test.ts` | Vitest |
| Hooks | Colocated `*.test.tsx` | Vitest |
| Views and component interactions | Colocated `*.test.tsx` | Vitest + Testing Library |
| Route smoke and critical browser flows | `src/client/web/tests/e2e/*.spec.ts` | Playwright |

## Workflow

1. State the user-visible behavior or internal contract being changed.
2. Choose the lowest owning layer for the first failing test.
3. Write the smallest failing test when practical.
4. Run the narrowest relevant command.
5. Implement the minimum code to pass.
6. Refactor with tests green.
7. Run the broader frontend checks before handoff.

## Static-First Checks

For public storefront pages, include at least one validation step that confirms the route does not rely on browser-side .NET API calls unless the issue explicitly requires it.
UI and view tests should receive explicit view-model fixtures or stub the server-data boundary. Do not call data-loading helpers from component tests when ambient environment variables could make the test read API-backed data.

When ISR or revalidation behavior changes, test the server-data/revalidation boundary and document any Cloudflare Pages versus Workers/OpenNext assumptions in the issue or docs.

## Narrow Test Commands

Prefer commands from the project package scripts. Common examples:

```bash
npm test -- menu
npm test -- revalidation
npm run test:e2e -- --grep "menu"
```

When package manager scripts differ, use the local project scripts rather than inventing new ones.

## Full Frontend Verification

Run the relevant subset for the change:

```bash
npm run lint
npm test
npm run build
```

If browser-visible behavior changed, also run:

```bash
npm run test:e2e
```

If Cloudflare runtime behavior matters and a preview script exists, run it and record the result.

## Testing Rules

- Test behavior, not implementation details.
- Prefer accessible queries such as role, label, and visible text.
- Mock backend modules at the server-data or transport boundary.
- Keep fixtures deterministic and version-controlled; do not assert against live, preview, or production API payloads.
- Use shared test render helpers when they exist.
- Keep Playwright focused on critical flows instead of duplicating component tests.
