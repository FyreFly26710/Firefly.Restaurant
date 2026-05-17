namespace Firefly.Restaurant.User.Core.Application.Authentication;

public sealed record AuthenticateUserCommand(
    string Account,
    string Password);
