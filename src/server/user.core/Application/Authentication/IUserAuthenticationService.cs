namespace Firefly.Restaurant.User.Core.Application.Authentication;

public interface IUserAuthenticationService
{
    Task<AuthenticatedUser?> AuthenticateAsync(
        AuthenticateUserCommand command,
        CancellationToken cancellationToken = default);
}
