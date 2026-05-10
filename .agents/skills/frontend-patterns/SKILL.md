---
name: frontend-patterns
description: Default React frontend implementation patterns for template projects. Use when adding, changing, or reviewing web client code under src/client/web, including folder structure, TanStack Query, Zustand, routing, HTTP, forms, and styling.
---

# Frontend Patterns

Use this skill for web client work under `src/client/web/`.
These are default project conventions; more specific local `AGENTS.md` files or existing code patterns win when they conflict.

## Default Stack

- React with TypeScript
- Vite for local development and builds
- React Router for route definitions unless the project has already chosen another router
- TanStack Query for server state
- Zustand for small client-owned global state
- Tailwind CSS for layout, spacing, typography, and design tokens
- Existing component libraries for accessible controls when already installed
- Vitest and Testing Library for unit/component tests
- Playwright for browser-level smoke and critical flows

## Folder Structure

Prefer this shape for new projects:

```text
src/client/web/
  src/
    api/                    # HTTP transport layer, one folder per backend resource
      <resource>/
        <resource>.api.ts
        <resource>.types.ts
    app/                    # App bootstrap, providers, router, theme
    components/             # Shared pure UI that no single feature owns
    features/               # Primary frontend code boundary
      <feature>/
        components/
        hooks/
        lib/
        mappers/
        store/
        types/
        views/
    lib/
      async/
      auth/
      http/
      env.ts
    routes/                 # Thin route wrappers
    test/
      render.tsx
      setupTests.ts
  tests/
    e2e/
```

## Boundary Rules

- Feature code belongs inside the feature folder that owns it.
- `src/api/` is the HTTP transport layer. API functions return raw DTOs.
- Views do not call `src/api/` directly; wrap reads in feature hooks.
- `src/routes/` files are thin. They parse route params and render feature views.
- `src/components/` is for shared UI only.
- `src/lib/` is for framework helpers and cross-feature utilities, not business feature logic.
- Zustand stores should stay close to the feature that owns them unless the state is truly app-wide.

## Data Fetching

Use TanStack Query for server-state reads.

```typescript
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products/products.api";
import { mapProductDetail } from "@/features/products/mappers/product-detail.mappers";

export function useProductDetail(productId: number | null) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId!).then(mapProductDetail),
    enabled: productId !== null
  });
}
```

Query keys must be stable and serializable:

```typescript
queryKey: ["products", productId]
queryKey: ["products", "list", { search, pageIndex, pageSize }]
queryKey: ["account", "current"]
```

## State Management

Use Zustand for client-owned state such as session state, feature UI state that spans routes, or local workflow state.
Do not put server data in Zustand; use TanStack Query for entities, lists, loading, cache, and refetching.

```typescript
export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  isAuthenticated: false,
  signIn: async (credentials) => { /* ... */ },
  signOut: () => set({ user: null, isAuthenticated: false })
}));
```

## Mutations And Forms

- Prefer TanStack Query mutations for writes that affect server state and cache invalidation.
- A local `useAsyncTask` helper is acceptable for one-off imperative tasks if the project already has one.
- Keep form state local unless multiple routes or components must share it.
- Keep transport DTOs separate from view models and form models.

## Route Modules

Route files should extract route params and render one feature view.

```typescript
import { useParams } from "react-router-dom";
import { ProductDetailView } from "@/features/products/views/ProductDetailView";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  return <ProductDetailView productId={productId} />;
}
```

## HTTP Client

Use the project HTTP client in `src/lib/http/` for all API calls.
Do not use raw `fetch` in feature code unless the project has not created an HTTP client yet.

```typescript
import { getJson } from "@/lib/http/client";

export async function getProductById(id: number): Promise<ProductDetailResponseDto> {
  return getJson<ProductDetailResponseDto>(`/api/products/${id}`);
}
```

The HTTP client should own auth headers, JSON content handling, and typed API errors.

## Styling

- Use Tailwind CSS for layout, spacing, typography, responsive behavior, and design tokens.
- Use the project component library for accessible controls when it exists.
- Avoid mixing multiple styling systems for the same concern.
- Keep view files readable; extract repeated UI into components when it clarifies ownership.

## What Not To Do

- Do not call API transport functions directly from views.
- Do not add Axios when the project already has a typed HTTP client.
- Do not put server state into Zustand.
- Do not hide route parsing, data fetching, and large mapping logic in route files.
- Do not create one-off provider setups in tests; use the shared test render helper.
