using Firefly.Restaurant.Admin.App.Application.Models;

namespace Firefly.Restaurant.Admin.App.Application.Commands;

public interface IAdminContentCommandService
{
    Task<AdminContentDashboard> UpdateShopProfileAsync(
        UpdateShopProfileCommand command,
        CancellationToken cancellationToken = default);

    Task<AdminContentDashboard> UpdateMenuItemAsync(
        UpdateMenuItemCommand command,
        CancellationToken cancellationToken = default);

    Task<AdminContentDashboard> ToggleMenuItemAvailabilityAsync(
        ToggleMenuItemAvailabilityCommand command,
        CancellationToken cancellationToken = default);
}

public sealed record UpdateShopProfileCommand(
    string DisplayName,
    string Tagline,
    string HomeHeadline,
    string HomeDescription,
    string ContactIntro,
    string PhoneNumber,
    string AddressLine1,
    string City,
    string PostalCode);

public sealed record UpdateMenuItemCommand(
    string Id,
    string CategoryId,
    string Name,
    string Description,
    decimal Price,
    bool Available,
    string Tags);

public sealed record ToggleMenuItemAvailabilityCommand(
    string Id,
    bool Available);
