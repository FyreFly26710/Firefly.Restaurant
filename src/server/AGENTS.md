# Server AGENTS.md

## Area Role

This folder owns the Firefly Restaurant server, Blazor admin app, and APIs.
Use this guidance with the root `AGENTS.md`, `docs/architecture.md`, `docs/development-plan.md`, and `docs/server/README.md`.

## Stack

- .NET 10
- ASP.NET Core APIs
- Blazor Server admin app
- EF Core with PostgreSQL
- MediatR for write paths
- RabbitMQ only when cross-service communication is needed
- Problem Details and OpenAPI
- Unit and functional tests

## Solution Shape

Use one `.slnx` under `src/server`.

Initial projects:

- `gateway.api`
- `admin.app`
- `menu.api`
- `menu.core`
- `user.api`
- `user.core`
- `common.lib`

Keep projects separated by responsibility, but do not split runtime deployment unless an issue explicitly requires it.

## Architecture Expectations

- Keep service boundaries explicit.
- Keep `Program.cs` thin.
- Keep contracts and DTOs clear.
- Use MediatR for write commands.
- Use explicit query services for reads.
- Keep persistence details behind the owning project infrastructure.
- Keep auth, authorization, logging, validation, correlation ids, and exception handling centralized.
- Put only small, stable cross-cutting code in `common.lib`.
- Prefer vertical changes that satisfy one issue at a time.

## Storefront And Revalidation Contract

- The server owns canonical content and media state.
- Normal public storefront browsing should not hit the .NET API directly.
- Storefront reads should use trusted build-time, server-side, preview, or revalidation paths.
- Admin changes that affect public content should trigger storefront revalidation.
- Timed storefront revalidation remains the fallback when on-demand revalidation is unavailable.

## Media Contract

- Process admin uploads on the server path.
- Convert images into web-friendly formats before public use.
- Serve media through CDN-cacheable routes with intentional cache headers.
- Do not expose arbitrary local disk paths through public URLs.

## Testing And Validation

Use project scripts once the solution is scaffolded.
Expected checks:

```bash
dotnet test src/server/Firefly.Restaurant.slnx
dotnet build src/server/Firefly.Restaurant.slnx
```

Use narrower project-level tests while developing one service or core library.
