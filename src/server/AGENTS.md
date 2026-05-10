# Server AGENTS.md

## Area Role

This folder is reserved for backend and server-side code.
Use the root default backend stack unless project-specific docs choose another stack.
Replace this placeholder with project-specific service architecture, persistence, testing, and deployment guidance when the project has real code.

## Default Expectations

- Keep service boundaries explicit.
- Keep contracts and DTOs clear.
- Use .NET, ASP.NET Core, EF Core for relational persistence, MediatR for write commands, Problem Details, and OpenAPI by default.
- Keep cross-cutting concerns such as auth, logging, validation, and correlation ids centralized.
- Prefer vertical changes that satisfy one issue at a time.
- Keep persistence details behind the owning server or infrastructure layer.
- Add or update tests for changed behavior when appropriate.
- Document operational assumptions when they affect deployment or support.

## Project-Specific Details To Add

- Language and framework.
- Solution or package structure.
- Persistence and migration conventions.
- API contract conventions.
- Auth and authorization model.
- Test commands.
- Build and validation commands.
