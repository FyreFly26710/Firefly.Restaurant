---
name: frontend-e2e-testing
description: Firefly Restaurant Playwright workflow for the Next.js storefront under src/client/web. Use when adding, refactoring, or validating browser-level coverage for route smoke tests, static-first browsing, and critical user journeys.
---

# Frontend E2E Testing

Use this skill when storefront browser behavior matters and component tests are not enough.

## What E2E Should Cover

Good Playwright targets:

- route smoke tests for public pages,
- menu browsing and navigation,
- auth redirects and protected routes when added,
- critical create/edit/delete flows that run in the web client,
- regressions that depend on real browser behavior.

For public browsing, assert user-visible content without depending on live production services.

## Static-First Expectations

Normal public route tests should not require the browser to call the .NET API.
If a test intentionally covers a browser-side API call, make that explicit in the spec name or test comments and ensure the issue documents the exception.
Run normal public E2E against deterministic fallback or fixture data. Do not let Playwright inherit a developer, preview, or production API base URL for smoke tests that are meant to validate static browsing.

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
Do not introduce a second E2E setup at the repository root for normal web storefront work.

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

test("guest can open the menu page", async ({ page }) => {
  await page.goto("/menu");

  await expect(page.getByRole("heading", { name: /menu/i })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
```

## Stability Rules

- Wait on user-visible outcomes, not arbitrary timeouts.
- Keep each spec focused on one journey.
- Prefer seeded or mocked test data when the project has fixtures.
- Do not depend on production services.
- Use a controlled web server config for deterministic E2E runs: explicit port, explicit storefront data environment, and no reuse of an already-running app server when that server may have different API settings.
- For public routes, capture page requests and assert that the browser did not request `/api/` unless the issue explicitly covers a browser API flow.
- Assert stable user-visible behavior from deterministic fixtures or fallback data, not content that can change in a live API.
- Capture traces/screenshots only through Playwright config or failure diagnostics unless debugging locally.
