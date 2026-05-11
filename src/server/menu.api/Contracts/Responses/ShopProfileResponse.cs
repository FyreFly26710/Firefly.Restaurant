namespace Firefly.Restaurant.Menu.Api.Contracts.Responses;

public sealed record ShopProfileResponse(
    int Id,
    string Slug,
    string DisplayName,
    string HomeHeadline,
    string HomeDescription,
    string ContactIntro,
    string LogoImageUrl,
    string HeroImageUrl,
    ShopContactDetailsResponse ContactDetails,
    List<ShopOpeningHourResponse> OpeningHours);

public sealed record ShopContactDetailsResponse(
    string PhoneNumber,
    string AddressLine1,
    string? AddressLine2,
    string City,
    string? Region,
    string PostalCode,
    string Country,
    string? MapUrl);

public sealed record ShopOpeningHourResponse(
    int Id,
    string DayOfWeek,
    TimeOnly? OpensAt,
    TimeOnly? ClosesAt,
    bool IsClosed,
    string? Note);
