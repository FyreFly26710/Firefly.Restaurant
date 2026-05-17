namespace Firefly.Restaurant.User.Core.Application.Queries;

public interface IUserAccountQuery
{
    Task<VerifiedUserReadModel?> VerifyUserAsync(
        VerifyUserQuery query,
        CancellationToken cancellationToken = default);
}
