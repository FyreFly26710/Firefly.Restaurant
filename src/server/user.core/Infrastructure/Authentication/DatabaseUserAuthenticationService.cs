using System.Security.Cryptography;
using System.Text;
using Firefly.Restaurant.User.Core.Application.Authentication;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Domain.Entities;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.User.Core.Infrastructure.Authentication;

internal sealed class DatabaseUserAuthenticationService(UserDbContext dbContext)
    : IUserAuthenticationService
{
    public async Task<AuthenticatedUser?> AuthenticateAsync(
        AuthenticateUserCommand command,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(command);

        var account = command.Account.Trim();
        if (string.IsNullOrWhiteSpace(account) || string.IsNullOrWhiteSpace(command.Password))
        {
            return null;
        }

        var userAccount = await dbContext.UserAccounts
            .AsNoTracking()
            .Where(candidate => candidate.Account.ToLower() == account.ToLower())
            .SingleOrDefaultAsync(cancellationToken);

        if (userAccount is null || !PasswordMatches(command.Password, userAccount.Password))
        {
            return null;
        }

        var normalizedRole = UserRoles.Normalize(userAccount.Role);
        if (normalizedRole is null)
        {
            return null;
        }

        return new AuthenticatedUser(
            Account: userAccount.Account,
            Role: normalizedRole,
            DisplayName: userAccount.DisplayName);
    }

    private static bool PasswordMatches(string candidatePassword, string storedPassword)
    {
        var candidateHash = SHA256.HashData(Encoding.UTF8.GetBytes(candidatePassword));
        var storedHash = SHA256.HashData(Encoding.UTF8.GetBytes(storedPassword));

        return CryptographicOperations.FixedTimeEquals(candidateHash, storedHash);
    }
}
