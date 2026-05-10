---
name: frontend-tdd-workflow
description: Default frontend TDD workflow for React web clients under src/client/web. Use when writing frontend features, fixing frontend bugs, refactoring views/hooks/state, or adding Vitest and Playwright coverage.
---

# Frontend TDD Workflow

Use this skill with `frontend-patterns` whenever frontend behavior changes.

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
3. Write the smallest failing test.
4. Run the narrowest relevant command.
5. Implement the minimum code to pass.
6. Refactor with tests green.
7. Run the broader frontend checks before handoff.

## Narrow Test Commands

Prefer commands from the project package scripts. Common examples:

```bash
npm test -- product-detail
npm test -- useProductDetail
npm run test:e2e -- --grep "product detail"
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

## Testing Rules

- Test behavior, not implementation details.
- Prefer accessible queries such as role, label, and visible text.
- Mock API modules at the transport boundary for component and hook tests.
- Use the shared `renderWithProviders` and `renderHookWithProviders` helpers when they exist.
- Give TanStack Query tests a test `QueryClient` with retries disabled.
- Keep Playwright focused on critical flows instead of duplicating component tests.

## Example Hook Test Shape

```typescript
it("loads the product detail", async () => {
  vi.mocked(getProductById).mockResolvedValueOnce({ id: 42, name: "Example" });

  const { result } = renderHookWithProviders(() => useProductDetail(42));

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.name).toBe("Example");
});
```

## Example View Test Shape

```typescript
it("renders the loaded product", async () => {
  vi.mocked(getProductById).mockResolvedValueOnce({ id: 42, name: "Example" });

  renderWithProviders(<ProductDetailView productId="42" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Example" })).toBeVisible();
});
```
