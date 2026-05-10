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

## Deployment

Production server deployment should mirror the familiar Firefly Signal model:

- build Docker images for executable server projects,
- push images to Docker Hub,
- deploy one Docker Compose unit on the Mac server,
- deploy manually or through SSH-based workflow dispatch,
- keep Cloudflare Tunnel machine-managed outside the tracked repository.

The intended future workflows are `.github/workflows/cd-server-images.yml` and `.github/workflows/deploy-server.yml`.
Do not create them until the server scaffold and executable project paths exist.

Only executable projects become runtime containers:

- `gateway-api`
- `menu-api`
- `user-api`
- `admin-app`

Keep `menu-api`, `user-api`, `admin-app`, PostgreSQL, Redis, and RabbitMQ internal to Docker networking or loopback.
Publish only `gateway-api` to a loopback port for Cloudflare Tunnel when public API access is required.

Blazor admin is private by default.
Do not add a public admin hostname, default Tunnel route, or default Cloudflare Access route unless a future issue documents the protected access model.

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
