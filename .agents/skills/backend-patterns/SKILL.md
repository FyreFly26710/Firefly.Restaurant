---
name: backend-patterns
description: Default .NET backend structure and coding patterns for template projects. Use when adding or refactoring APIs, application logic, persistence, provider adapters, contracts, shared kernels, or event bus code under src/server.
---

# Backend Patterns

Use this skill for backend work under `src/server/`.
These are default conventions; local `AGENTS.md` files and existing project patterns take precedence.

## Default Stack

- .NET for backend services
- ASP.NET Core Minimal APIs or endpoint modules
- EF Core for persistence when a relational database is used
- MediatR for write commands
- Explicit query services for reads unless the project already uses MediatR for reads
- Problem Details for API errors
- OpenAPI for API description
- Unit tests and functional tests with the project test framework

## What Good Looks Like

- `Program.cs` stays thin.
- Service registration lives in `Extensions/ApplicationServiceExtensions.cs` or equivalent.
- API transport models live in `Contracts/Requests` and `Contracts/Responses`.
- Endpoint modules live in `Apis/` or `Endpoints/`.
- Read and write application logic are split cleanly.
- Domain entities and constants are separated from infrastructure.
- External providers live under `Infrastructure/Services/<ProviderName>/`.
- Mapping is explicit. Do not add AutoMapper by default.

## Service Layout

Prefer this shape for feature APIs:

```text
<Feature>.Api/
  Apis/
    <Resource>Api.cs
    <Resource>ApiMappers.cs
  Contracts/
    Requests/
    Responses/
  Application/
    Commands/
    Queries/
    Mappers/
    Exceptions/
    IntegrationEventHandlers/
  Infrastructure/
    Persistence/
    Services/
  Domain/
    Entities/
    Consts/
    DomainEvents/
  Extensions/
  Options/
  GlobalUsings.cs
  Program.cs
```

Small services can stay lighter, but they should keep the same boundaries.

## Startup Rules

`Program.cs` should only:

- create the builder
- add shared defaults
- call service registration extensions
- add problem details and OpenAPI
- add shared exception handling
- build the app
- map endpoints
- run the app

Do not put option classes, HTTP clients, database wiring details, large endpoint handlers, or inline auth types in `Program.cs`.

## Application Layer Rules

- Put write-side commands and handlers in `Application/Commands/`.
- Use MediatR for writes unless project guidance says otherwise.
- Put each command and handler in separate files when complexity is non-trivial.
- Put read-side interfaces and implementations in `Application/Queries/`.
- Keep query execution out of endpoint modules.
- Put entity-to-response mapping in `Application/Mappers/`.
- Keep request-to-command or request-to-query mapping in API mappers.

## API Layer Rules

Endpoint modules should:

- define route groups
- validate transport-level input
- translate requests into application calls
- return typed results

Endpoint modules should not:

- talk directly to EF Core
- own provider integration logic
- parse claims throughout handlers
- contain large mapping blocks
- catch business exceptions only to translate them into problem details

Use a narrow current-user abstraction when identity is needed.

## Contracts And Mapping

- Transport contracts live under `Contracts/Requests` and `Contracts/Responses`.
- Do not mix request and response records into broad catch-all files.
- Do not use anonymous payloads for stable public endpoints.
- Prefer named arguments for non-trivial record construction.
- Keep DTOs, domain entities, and view/API responses distinct.

## Infrastructure Rules

Persistence:

- DbContexts and migrations stay under `Infrastructure/Persistence/`.
- Seeders should be idempotent.
- Keep EF configuration close to the DbContext or entity configuration files.

External integrations:

- Provider adapters and provider-owned models live under `Infrastructure/Services/<ProviderName>/`.
- Translate provider failures into application-level failures before crossing the API boundary.

## Exception Rules

- Unexpected failures should reach shared exception middleware.
- Expected write-path failures should use custom typed exceptions or typed results with stable API responses.
- Normal read-side not-found flow should usually return `null` or a result type rather than throw.
- Domain entities should throw built-in guard exceptions for invalid construction or invariant misuse.
- Problem-details responses should include status, title, detail, instance, trace id, and error code when available.

## Domain Rules

- Put entities in `Domain/Entities/`.
- Put enums and constants in `Domain/Consts/`.
- Keep domain behavior on domain entities when it is true domain logic.
- Do not let EF Core, HTTP, or transport concerns leak into domain types.

## Shared Kernel Rules

Keep shared code small and stable:

- entity base types
- id generation
- EF helpers
- current-user abstractions
- pipeline helpers only when clearly justified

Do not keep duplicate copies of the same shared type in different namespaces or folders.
