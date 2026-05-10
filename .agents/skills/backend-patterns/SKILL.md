---
name: backend-patterns
description: Firefly Restaurant .NET backend structure and coding patterns. Use when adding or refactoring APIs, Blazor admin code, application logic, persistence, provider adapters, contracts, shared kernel, or event bus code under src/server.
---

# Backend Patterns

Use this skill for server work under `src/server/`.
Local `AGENTS.md` files, project docs, and existing code patterns take precedence.

## Default Stack

- .NET 10
- ASP.NET Core APIs
- Blazor Server admin app
- EF Core with PostgreSQL
- MediatR for write commands
- Explicit query services for reads
- RabbitMQ where cross-service communication is needed
- Problem Details for API errors
- OpenAPI for API description
- Unit tests and functional tests

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

Project separation is a code ownership boundary first.
Do not split runtime deployment unless an issue explicitly requires it.

## API Project Layout

Prefer this shape inside `*.api` projects:

```text
<service>.api/
  Apis/
    <Resource>Api.cs
    <Resource>ApiMappers.cs
  Contracts/
    Requests/
    Responses/
  Extensions/
  Options/
  GlobalUsings.cs
  Program.cs
```

## Core Project Layout

Prefer this shape inside `*.core` projects:

```text
<service>.core/
  Application/
    Commands/
    Queries/
    Mappers/
    Exceptions/
    IntegrationEventHandlers/
  Domain/
    Entities/
    Consts/
    DomainEvents/
  Infrastructure/
    Persistence/
    Services/
  Extensions/
  Options/
  GlobalUsings.cs
```

Small features can stay lighter, but should keep these boundaries clear.

## Admin App Rules

- Keep Blazor components focused on UI composition and event handling.
- Put admin application logic in services or core project commands/queries.
- Do not let components talk directly to EF Core.
- Admin changes that affect public content should call the same application path that triggers revalidation.

## Startup Rules

`Program.cs` should only:

- create the builder,
- add shared defaults,
- call service registration extensions,
- add problem details and OpenAPI,
- add shared exception handling,
- build the app,
- map endpoints or Blazor routes,
- run the app.

Do not put option classes, HTTP clients, database wiring details, large endpoint handlers, or inline auth types in `Program.cs`.

## Application Layer Rules

- Put write-side commands and handlers in `Application/Commands`.
- Use MediatR for writes unless project guidance says otherwise.
- Put read-side interfaces and implementations in `Application/Queries`.
- Keep query execution out of endpoint modules and Blazor components.
- Put entity-to-response mapping in `Application/Mappers`.
- Keep request-to-command or request-to-query mapping in API mappers.
- Trigger storefront revalidation from application events or handlers when public content changes.

## API Layer Rules

Endpoint modules should:

- define route groups,
- validate transport-level input,
- translate requests into application calls,
- return typed results.

Endpoint modules should not:

- talk directly to EF Core,
- own provider integration logic,
- parse claims throughout handlers,
- contain large mapping blocks,
- catch business exceptions only to translate them into problem details.

Use a narrow current-user abstraction when identity is needed.

## Contracts And Mapping

- Transport contracts live under `Contracts/Requests` and `Contracts/Responses`.
- Do not mix request and response records into broad catch-all files.
- Do not use anonymous payloads for stable public endpoints.
- Prefer named arguments for non-trivial record construction.
- Keep DTOs, domain entities, admin view models, and API responses distinct.

## Infrastructure Rules

Persistence:

- DbContexts and migrations stay under `Infrastructure/Persistence`.
- Seeders should be idempotent.
- Keep EF configuration close to the DbContext or entity configuration files.

External integrations:

- Provider adapters and provider-owned models live under `Infrastructure/Services/<ProviderName>`.
- Translate provider failures into application-level failures before crossing the API boundary.

## Storefront Contract

- The server owns canonical content and media state.
- Normal public storefront browsing should not hit the .NET API directly.
- Public content reads should be safe for build-time, server-side, preview, or revalidation use.
- Any public runtime API exposure must document cache behavior, auth, rate limiting, and failure modes.

## Exception Rules

- Unexpected failures should reach shared exception middleware.
- Expected write-path failures should use custom typed exceptions or typed results with stable API responses.
- Normal read-side not-found flow should usually return `null` or a result type rather than throw.
- Problem-details responses should include status, title, detail, instance, trace id, and error code when available.

## Domain Rules

- Keep true domain behavior on domain entities or domain services.
- Do not let EF Core, HTTP, Blazor, or transport concerns leak into domain types.
- Put enums and constants in domain/core areas owned by the relevant service.
- Move code to `common.lib` only when it is stable, cross-cutting, and not feature-specific.

## Shared Kernel Rules

Keep `common.lib` small and stable:

- entity base types,
- id generation,
- EF helpers,
- current-user abstractions,
- pipeline helpers only when clearly justified.

Do not keep duplicate copies of the same shared type in different namespaces or folders.
Do not move feature-specific behavior into `common.lib`.
