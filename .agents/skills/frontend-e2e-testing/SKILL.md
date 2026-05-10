---
name: frontend-e2e-testing
description: Default Playwright workflow for web clients under src/client/web. Use when adding, refactoring, or validating browser-level coverage for route smoke tests and critical user journeys.
---

# Frontend E2E Testing

Use this skill when browser behavior matters and component tests are not enough.

## What E2E Should Cover

Good Playwright targets:

- route smoke tests
- authentication redirects and protected routes
- critical create/edit/delete flows
- cross-page navigation
- regressions that depend on real browser behavior

Avoid:

- duplicating every component test in a browser
- broad click-through scripts with weak assertions
- styling assertions that belong in component or visual tests
- testing implementation details hidden behind the UI

## Default Layout

```text
src/client/web/
  playwright.config.ts
  tests/
    e2e/
      *.spec.ts
    fixtures/
```

Only add fixtures when reuse is real.
Do not introduce a second E2E setup at the repository root for normal web client work.

## Commands

Run from the web client folder unless project scripts say otherwise:

```bash
npm run test:e2e
npm run test:e2e -- --grep "critical flow"
npm run test:e2e -- --headed
```

If the project uses another package manager, use the existing scripts.

## Selector Rules

Prefer:

- `getByRole`
- `getByLabel`
- stable visible text
- semantic landmarks

Use `data-testid` only when there is no stable accessible selector and the element is intentionally test-addressable.

## Spec Shape

```typescript
import { expect, test } from "@playwright/test";

test("user can open a product detail page", async ({ page }) => {
  await page.goto("/products/42");

  await expect(page.getByRole("heading", { name: /product/i })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
```

## Stability Rules

- Wait on user-visible outcomes, not arbitrary timeouts.
- Keep each spec focused on one journey.
- Prefer seeded or mocked test data when the project has fixtures.
- Do not depend on production services.
- Capture traces/screenshots only through Playwright config or failure diagnostics unless debugging locally.
