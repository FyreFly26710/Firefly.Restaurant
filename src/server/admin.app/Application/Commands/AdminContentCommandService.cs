using Firefly.Restaurant.Admin.App.Application.Models;
using Firefly.Restaurant.Admin.App.Infrastructure.Demo;

namespace Firefly.Restaurant.Admin.App.Application.Commands;

internal sealed class AdminContentCommandService(AdminDemoContentStore store) : IAdminContentCommandService
{
    public Task<AdminContentDashboard> UpdateShopProfileAsync(
        UpdateShopProfileCommand command,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return Task.FromResult(store.UpdateShopProfile(command));
    }

    public Task<AdminContentDashboard> UpdateMenuItemAsync(
        UpdateMenuItemCommand command,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return Task.FromResult(store.UpdateMenuItem(command));
    }

    public Task<AdminContentDashboard> ToggleMenuItemAvailabilityAsync(
        ToggleMenuItemAvailabilityCommand command,
        CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return Task.FromResult(store.ToggleMenuItemAvailability(command));
    }
}
