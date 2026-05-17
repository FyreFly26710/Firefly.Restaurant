using Firefly.Restaurant.User.Core.Application.Authentication;
using Firefly.Restaurant.User.Core.Infrastructure.Authentication;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.User.Core.Extensions;

public static class UserCoreServiceCollectionExtensions
{
    public static IServiceCollection AddUserCore(this IServiceCollection services, string userConnectionString)
    {
        if (string.IsNullOrWhiteSpace(userConnectionString))
        {
            throw new ArgumentException("Value cannot be empty.", nameof(userConnectionString));
        }

        services.AddDbContext<UserDbContext>(options =>
            options.UseNpgsql(userConnectionString));

        services.TryAddScoped<IUserAuthenticationService, DatabaseUserAuthenticationService>();

        return services;
    }
}
