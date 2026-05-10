using Firefly.Restaurant.Menu.Core.Application.Queries;
using Firefly.Restaurant.Menu.Core.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.Menu.Core.Extensions;

public static class MenuCoreServiceCollectionExtensions
{
    public static IServiceCollection AddMenuCore(this IServiceCollection services)
    {
        services.TryAddSingleton<IMenuQueryService, MockMenuQueryService>();

        return services;
    }
}
