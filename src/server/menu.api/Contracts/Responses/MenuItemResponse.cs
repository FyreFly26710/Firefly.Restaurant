namespace Firefly.Restaurant.Menu.Api.Contracts.Responses;

public sealed record MenuItemResponse(
    string Slug,
    string Name,
    string Description,
    string Category,
    decimal Price,
    bool Available,
    IReadOnlyList<string> Tags);
