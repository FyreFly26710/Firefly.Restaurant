namespace Firefly.Restaurant.User.Core.Application.Queries;

public sealed record VerifyUserQuery(
    string Account,
    string Password);
