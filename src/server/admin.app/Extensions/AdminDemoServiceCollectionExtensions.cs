using Firefly.Restaurant.Admin.App.Application.Commands;
using Firefly.Restaurant.Admin.App.Application.Queries;
using Firefly.Restaurant.Admin.App.Infrastructure.Demo;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.Admin.App.Extensions;

public static class AdminDemoServiceCollectionExtensions
{
    public static IServiceCollection AddAdminDemoContent(this IServiceCollection services)
    {
        services.TryAddSingleton<AdminDemoContentStore>();
        services.TryAddScoped<IAdminContentQueryService, AdminContentQuery>();
        services.TryAddScoped<IAdminContentCommandService, AdminContentCommandService>();

        return services;
    }
}
