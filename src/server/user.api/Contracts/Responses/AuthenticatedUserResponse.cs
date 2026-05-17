namespace Firefly.Restaurant.User.Api.Contracts.Responses;

public sealed record AuthenticatedUserResponse(
    string Account,
    string Role,
    string DisplayName);
