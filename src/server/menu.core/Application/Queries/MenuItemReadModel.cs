namespace Firefly.Restaurant.Menu.Core.Application.Queries;

public sealed record MenuItemReadModel(
    string Slug,
    string Name,
    string Description,
    string Category,
    decimal Price,
    bool Available,
    IReadOnlyList<string> Tags);
