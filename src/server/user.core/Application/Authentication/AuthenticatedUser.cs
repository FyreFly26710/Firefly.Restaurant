namespace Firefly.Restaurant.User.Core.Application.Authentication;

public sealed record AuthenticatedUser(
    string Account,
    string Role,
    string DisplayName);
