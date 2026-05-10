namespace Firefly.Restaurant.Gateway.Api.Contracts.Responses;

public sealed record MenuItemResponse(
    string Slug,
    string Name,
    string Description,
    string Category,
    decimal Price,
    bool Available,
    IReadOnlyList<string> Tags);
