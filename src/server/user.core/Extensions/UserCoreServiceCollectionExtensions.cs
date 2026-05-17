using Firefly.Restaurant.User.Core.Application.Authentication;
using Firefly.Restaurant.User.Core.Infrastructure.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.User.Core.Extensions;

public static class UserCoreServiceCollectionExtensions
{
    public static IServiceCollection AddUserCore(this IServiceCollection services)
    {
        services.TryAddScoped<IUserAuthenticationService, ConfiguredUserAuthenticationService>();

        return services;
    }
}
