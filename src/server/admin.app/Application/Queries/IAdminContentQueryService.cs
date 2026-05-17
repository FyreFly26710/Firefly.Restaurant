using Firefly.Restaurant.Admin.App.Application.Models;

namespace Firefly.Restaurant.Admin.App.Application.Queries;

public interface IAdminContentQueryService
{
    Task<AdminContentDashboard> GetDashboardAsync(CancellationToken cancellationToken = default);
}
