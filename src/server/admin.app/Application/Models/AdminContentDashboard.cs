namespace Firefly.Restaurant.Admin.App.Application.Models;

public sealed record AdminContentDashboard(
    ShopProfileEditorModel Shop,
    IReadOnlyList<MenuCategoryEditorModel> Categories,
    IReadOnlyList<MenuItemEditorModel> MenuItems,
    DateTimeOffset LastUpdatedAt)
{
    public int AvailableItemCount => MenuItems.Count(item => item.Available);
}

public sealed record ShopProfileEditorModel(
    string DisplayName,
    string Tagline,
    string HomeHeadline,
    string HomeDescription,
    string ContactIntro,
    string PhoneNumber,
    string AddressLine1,
    string City,
    string PostalCode,
    string HeroImageUrl,
    IReadOnlyList<ShopOpeningHourEditorModel> OpeningHours);

public sealed record ShopOpeningHourEditorModel(
    string DayLabel,
    string OpensAt,
    string ClosesAt,
    bool IsClosed,
    string? Note);

public sealed record MenuCategoryEditorModel(
    string Id,
    string DisplayName,
    string Description);

public sealed record MenuItemEditorModel(
    string Id,
    string CategoryId,
    string Name,
    string Description,
    decimal Price,
    bool Available,
    IReadOnlyList<string> Tags);
