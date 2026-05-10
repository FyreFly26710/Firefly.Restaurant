namespace Firefly.Restaurant.Menu.Api.Contracts.Responses;

public sealed record MenuCategoryResponse(
    int Id,
    string Slug,
    string DisplayName,
    string Description,
    int DisplayOrder,
    List<MenuItemResponse> Items);

public sealed record MenuItemResponse(
    int Id,
    string Slug,
    string Name,
    string Description,
    decimal Price,
    bool Available,
    int DisplayOrder,
    string? ImageUrl,
    List<ItemTagResponse> Tags);

public sealed record ItemTagResponse(
    int Id,
    string Value,
    string Color);
