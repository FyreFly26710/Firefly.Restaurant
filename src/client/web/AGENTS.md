# Web Client AGENTS.md

## Area Role

This folder is reserved for the web client.
Use the root default web stack unless project-specific docs choose another stack.
Replace this placeholder with project-specific frontend architecture, testing, and design guidance when the project has real code.

## Default Expectations

- Keep route and entry files thin.
- Keep feature behavior close to the feature that owns it.
- Keep API calls behind small typed client modules.
- Use React, TypeScript, Vite, TanStack Query, Tailwind CSS, Vitest, Testing Library, and Playwright by default.
- Use Zustand only for client-owned state that is genuinely shared.
- Include loading, empty, error, and success states for user-facing flows.
- Keep responsive behavior intentional across desktop and mobile widths.
- Prefer local state until shared state is clearly needed.
- Add or update tests for user-visible behavior when appropriate.

## Project-Specific Details To Add

- Framework and version.
- Routing approach.
- State management approach.
- Styling and design system.
- API client conventions.
- Test commands.
- Build and validation commands.
