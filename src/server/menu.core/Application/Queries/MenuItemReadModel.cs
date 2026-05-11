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

public sealed record ShopProfileReadModel(
    int Id,
    string Slug,
    string DisplayName,
    string HomeHeadline,
    string HomeDescription,
    string ContactIntro,
    string LogoImageUrl,
    string HeroImageUrl,
    ShopContactDetailsReadModel ContactDetails,
    IReadOnlyList<ShopOpeningHourReadModel> OpeningHours);

public sealed record ShopContactDetailsReadModel(
    string PhoneNumber,
    string AddressLine1,
    string? AddressLine2,
    string City,
    string? Region,
    string PostalCode,
    string Country,
    string? MapUrl);

public sealed record ShopOpeningHourReadModel(
    int Id,
    DayOfWeek DayOfWeek,
    TimeOnly? OpensAt,
    TimeOnly? ClosesAt,
    bool IsClosed,
    string? Note);
