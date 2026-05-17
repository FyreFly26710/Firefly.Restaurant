using Firefly.Restaurant.User.Core.Extensions;

namespace Firefly.Restaurant.User.Api.Extensions;

public static class UserApiServiceCollectionExtensions
{
    public static IServiceCollection AddUserApi(
        this IServiceCollection services,
        string userConnectionString)
    {
        services.AddUserCore(userConnectionString);

        return services;
    }
}
