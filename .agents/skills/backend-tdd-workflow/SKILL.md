---
name: backend-tdd-workflow
description: Default backend TDD workflow for .NET services under src/server. Use when writing backend features, fixing backend bugs, refactoring application logic, or adding unit and functional tests.
---

# Backend TDD Workflow

Use this skill with `backend-patterns` when backend behavior changes.

## Testing Defaults

Start with a failing test at the lowest layer that owns the behavior.

Use:

- Unit tests for domain rules, pure helpers, pure mappers, and deterministic support logic
- Functional tests for command handlers, query services, endpoint behavior, route binding, auth, persistence, validation, and problem-details responses

Do not add a third test layer such as `IntegrationTests` by default unless the project already uses it or the issue explicitly needs it.

## Default Test Layout

Prefer this shape for new services:

```text
src/server/
  <Feature>.Api/
  tests/
    <Feature>.UnitTests/
    <Feature>.FunctionalTests/
```

If an existing project uses a different naming convention, follow the existing convention.

## Workflow

1. State the behavior being changed.
2. Pick the lowest owning layer.
3. Write the failing test first when practical.
4. Run the narrowest test command.
5. Implement the minimum passing code.
6. Refactor with tests green.
7. Run the relevant service or solution tests before handoff.

## Unit Tests

Use unit tests for:

- domain entities and value objects
- pure mappers
- pure validation helpers
- deterministic support logic with no app host

Avoid booting the web host, using EF Core, or mocking HTTP in unit tests for simple domain behavior.

## Functional Tests

Use functional tests for:

- command handlers
- query services
- endpoint status codes and response bodies
- persistence behavior
- auth and current-user behavior
- problem-details mapping

Functional tests may use a test app factory, in-memory or SQLite database, and test doubles for external providers.
Do not call real third-party services from automated tests.

## Commands

Use project-specific commands when available. Common examples:

```bash
dotnet test src/server/tests/<Feature>.UnitTests/<Feature>.UnitTests.csproj
dotnet test src/server/tests/<Feature>.FunctionalTests/<Feature>.FunctionalTests.csproj
dotnet test src/server/<Project>.sln
```

## Test Quality Rules

- Test behavior and contracts, not private implementation details.
- Cover happy path, important edge cases, and expected error paths.
- Include transport/auth behavior when HTTP behavior changes.
- Keep fixtures close to the service that owns them unless reuse is real.
- Do not invent numeric coverage thresholds unless the project defines them.

## Example Unit Test Shape

```csharp
[TestMethod]
public void Rename_RejectsEmptyName()
{
    var entity = Product.Create("Original");

    Assert.ThrowsException<ArgumentException>(() => entity.Rename(""));
}
```

## Example Functional Test Shape

```csharp
[TestMethod]
public async Task GetProduct_ReturnsNotFoundForMissingProduct()
{
    await using var factory = new ProductApiFactory();
    using var client = factory.CreateClient();

    var response = await client.GetAsync("/api/products/999");

    Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
}
```
