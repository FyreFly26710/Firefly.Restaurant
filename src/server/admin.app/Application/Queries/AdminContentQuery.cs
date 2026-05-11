using Firefly.Restaurant.Admin.App.Application.Models;
using Firefly.Restaurant.Admin.App.Infrastructure.Demo;

namespace Firefly.Restaurant.Admin.App.Application.Queries;

internal sealed class AdminContentQuery(AdminDemoContentStore store) : IAdminContentQueryService
{
    public Task<AdminContentDashboard> GetDashboardAsync(CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        return Task.FromResult(store.GetSnapshot());
    }
}
