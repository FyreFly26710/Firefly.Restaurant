namespace Firefly.Restaurant.User.Api.Contracts.Requests;

public sealed record LoginRequest(
    string? Account,
    string? Password);
