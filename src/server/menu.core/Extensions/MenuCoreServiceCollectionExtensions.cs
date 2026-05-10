using Firefly.Restaurant.Menu.Core.Application.Queries;
using Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.Menu.Core.Extensions;

public static class MenuCoreServiceCollectionExtensions
{
    public static IServiceCollection AddMenuCore(this IServiceCollection services, string menuConnectionString)
    {
        if (string.IsNullOrWhiteSpace(menuConnectionString))
        {
            throw new ArgumentException("Value cannot be empty.", nameof(menuConnectionString));
        }

        services.AddDbContext<MenuDbContext>(options =>
            options.UseNpgsql(menuConnectionString));

        services.TryAddScoped<IMenuQueryService, MenuQuery>();

        return services;
    }
}
