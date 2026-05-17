using Firefly.Restaurant.User.Core.Extensions;
using Firefly.Restaurant.User.Core.Options;

namespace Firefly.Restaurant.User.Api.Extensions;

public static class UserApiServiceCollectionExtensions
{
    public static IServiceCollection AddUserApi(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<UserAuthenticationOptions>(options =>
        {
            options.Accounts.Clear();

            foreach (var accountSection in configuration
                .GetSection(UserAuthenticationOptions.SectionName)
                .GetSection("Accounts")
                .GetChildren())
            {
                options.Accounts.Add(new UserCredentialOptions
                {
                    Account = accountSection["Account"] ?? string.Empty,
                    Password = accountSection["Password"] ?? string.Empty,
                    Role = accountSection["Role"] ?? string.Empty,
                    DisplayName = accountSection["DisplayName"] ?? string.Empty
                });
            }
        });

        services.AddUserCore();

        return services;
    }
}
