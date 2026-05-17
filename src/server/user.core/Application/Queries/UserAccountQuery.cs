using System.Security.Cryptography;
using System.Text;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.User.Core.Application.Queries;

internal sealed class UserAccountQuery(UserDbContext dbContext) : IUserAccountQuery
{
    public async Task<VerifiedUserReadModel?> VerifyUserAsync(
        VerifyUserQuery query,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(query);

        var account = query.Account.Trim();
        if (string.IsNullOrWhiteSpace(account) || string.IsNullOrWhiteSpace(query.Password))
        {
            return null;
        }

        var userAccount = await dbContext.UserAccounts
            .AsNoTracking()
            .Where(candidate => candidate.Account.ToLower() == account.ToLower())
            .SingleOrDefaultAsync(cancellationToken);

        if (userAccount is null || !PasswordMatches(query.Password, userAccount.Password))
        {
            return null;
        }

        var normalizedRole = UserRoles.Normalize(userAccount.Role);
        if (normalizedRole is null)
        {
            return null;
        }

        return new VerifiedUserReadModel(
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
