namespace Firefly.Restaurant.User.Core.Application.Queries;

public sealed record VerifiedUserReadModel(
    string Account,
    string Role,
    string DisplayName);
