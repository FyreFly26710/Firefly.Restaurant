using System.Security.Cryptography;
using System.Text;
using Firefly.Restaurant.User.Core.Application.Authentication;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Options;
using Microsoft.Extensions.Options;

namespace Firefly.Restaurant.User.Core.Infrastructure.Authentication;

internal sealed class ConfiguredUserAuthenticationService(IOptions<UserAuthenticationOptions> options)
    : IUserAuthenticationService
{
    public Task<AuthenticatedUser?> AuthenticateAsync(
        AuthenticateUserCommand command,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(command);
        cancellationToken.ThrowIfCancellationRequested();

        var account = command.Account.Trim();
        if (string.IsNullOrWhiteSpace(account) || string.IsNullOrWhiteSpace(command.Password))
        {
            return Task.FromResult<AuthenticatedUser?>(null);
        }

        var configuredAccount = options.Value.Accounts
            .Where(IsConfiguredAccount)
            .FirstOrDefault(candidate => string.Equals(
                candidate.Account.Trim(),
                account,
                StringComparison.OrdinalIgnoreCase));

        if (configuredAccount is null || !PasswordMatches(command.Password, configuredAccount.Password))
        {
            return Task.FromResult<AuthenticatedUser?>(null);
        }

        var normalizedRole = UserRoles.Normalize(configuredAccount.Role);
        var normalizedAccount = configuredAccount.Account.Trim();
        var displayName = string.IsNullOrWhiteSpace(configuredAccount.DisplayName)
            ? normalizedAccount
            : configuredAccount.DisplayName.Trim();

        return Task.FromResult<AuthenticatedUser?>(new AuthenticatedUser(
            Account: normalizedAccount,
            Role: normalizedRole!,
            DisplayName: displayName));
    }

    private static bool IsConfiguredAccount(UserCredentialOptions account)
    {
        return !string.IsNullOrWhiteSpace(account.Account)
            && !string.IsNullOrWhiteSpace(account.Password)
            && UserRoles.Normalize(account.Role) is not null;
    }

    private static bool PasswordMatches(string candidatePassword, string configuredPassword)
    {
        var candidateHash = SHA256.HashData(Encoding.UTF8.GetBytes(candidatePassword));
        var configuredHash = SHA256.HashData(Encoding.UTF8.GetBytes(configuredPassword));

        return CryptographicOperations.FixedTimeEquals(candidateHash, configuredHash);
    }
}
