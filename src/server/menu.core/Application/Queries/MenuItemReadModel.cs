namespace Firefly.Restaurant.Menu.Core.Application.Queries;

public sealed record MenuCategoryReadModel(
    int Id,
    string Slug,
    string DisplayName,
    string Description,
    int DisplayOrder,
    IReadOnlyList<MenuItemReadModel> Items);

public sealed record MenuItemReadModel(
    int Id,
    string Slug,
    string Name,
    string Description,
    decimal Price,
    bool Available,
    int DisplayOrder,
    string? ImageUrl,
    IReadOnlyList<MenuItemTagReadModel> Tags);

public sealed record MenuItemTagReadModel(
    int Id,
    string Value,
    string Color);
