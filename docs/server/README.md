# Server Guidance

This folder contains project guidance for `src/server`.

## Stack

- .NET 10
- ASP.NET Core APIs
- Blazor Server admin app
- EF Core with PostgreSQL
- MediatR for write paths
- RabbitMQ when cross-service communication is needed
- Problem Details and OpenAPI

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

Keep project boundaries explicit, but do not split runtime deployment until an issue proves the operational need.

## Public Content Contract

The server owns canonical menu, shop, media, user, and admin data.
Public storefront content should be exposed through trusted server-side, build-time, preview, or revalidation paths.
Normal public storefront browsing should not hit the .NET API directly.

Admin changes that affect public content should trigger storefront revalidation.
Timed revalidation remains the fallback path.

## Media

Admin uploads should be processed by the server into web-friendly formats.
Expose media through CDN-cacheable routes and set cache behavior intentionally.

## Validation

Use project commands once the solution is scaffolded.
Expected checks:

```bash
dotnet test src/server/Firefly.Restaurant.slnx
dotnet build src/server/Firefly.Restaurant.slnx
```

Use narrower project-level test commands while developing one service or core library.
