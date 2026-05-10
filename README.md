# Firefly Restaurant

Firefly Restaurant is an issue-driven monorepo for a high-performance restaurant storefront, admin experience, and API platform.

The first production targets are:

- `src/client/web`: a Next.js App Router storefront with TypeScript, Tailwind CSS, ISR/static-first pages, and Cloudflare CDN caching.
- `src/server`: one .NET 10 solution for Blazor Server admin pages and API services.

Future mobile clients are expected under `src/client/ios` and `src/client/android`, but they are out of scope for the initial setup.

## Architecture Intent

- Public visitors should receive cached storefront pages and media from Cloudflare.
- Normal storefront browsing must not call the .NET API directly.
- Backend/API access from the storefront is limited to trusted build, server-side, or revalidation paths unless an issue explicitly documents an exception.
- Blazor admin changes update backend state and trigger storefront revalidation where public content changes.
- Media is uploaded and processed through the server/admin path, then exposed through CDN-cacheable routes.

Cloudflare deployment is Pages-first for now. This is an intentional project default with a known validation risk: current Cloudflare guidance points full-stack Next.js ISR support toward Workers with the OpenNext adapter, while Pages remains the straightforward static site path.

## Repository Structure

- `AGENTS.md` contains global agent workflow and project rules.
- `.agents/skills/` contains reusable root skills for issue handling, documentation lookup, frontend work, backend work, and PR work.
- `.agents/scripts/` contains GitHub App helper wrappers for agent bot identity, with fallback to the current `gh` user when app credentials are missing.
- `.github/` contains the pull request template.
- `docs/` contains product, architecture, development, and project-specific guidance.
- `docs/client/web/` contains web storefront guidance.
- `docs/server/` contains server/admin/API guidance.
- `docs/demo-ui/` contains prototype UX references only. The sample restaurant name and copy are not the Firefly Restaurant product identity.
- `src/client/web/` contains the web storefront project area and its local `AGENTS.md`.
- `src/server/` contains the .NET server project area and its local `AGENTS.md`.

## Agent Workflow

GitHub issues are the durable source of truth for implementation work. Agents should follow the root `AGENTS.md`, the relevant local project `AGENTS.md`, and the skills under `.agents/skills/`.

Default delivery mode is agent-only. Use pair-work mode only when Dev explicitly requests direct collaboration in chat.

Issue branches use `issue-<number>-<short-kebab-title>`, and implementation work should be committed and pushed before an agent ends a coding run.

## Documentation Index

- `docs/product-requirements.md`: product direction and core workflows.
- `docs/architecture.md`: system boundaries and architectural contracts.
- `docs/development-plan.md`: phased delivery plan and known risks.
- `docs/client/web/README.md`: storefront setup, caching, validation, and operational notes.
- `docs/server/README.md`: server solution setup, validation, and operational notes.
