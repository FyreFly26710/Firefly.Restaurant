using Firefly.Restaurant.User.Api.Contracts.Requests;
using Firefly.Restaurant.User.Api.Contracts.Responses;
using Firefly.Restaurant.User.Core.Application.Authentication;

namespace Firefly.Restaurant.User.Api.Apis;

internal static class UserAuthApiMappers
{
    public static AuthenticateUserCommand ToCommand(this LoginRequest request)
    {
        return new AuthenticateUserCommand(
            Account: request.Account?.Trim() ?? string.Empty,
            Password: request.Password ?? string.Empty);
    }

    public static AuthenticatedUserResponse ToResponse(this AuthenticatedUser user)
    {
        return new AuthenticatedUserResponse(
            Account: user.Account,
            Role: user.Role,
            DisplayName: user.DisplayName);
    }

    public static Dictionary<string, string[]> GetValidationErrors(this LoginRequest request)
    {
        var errors = new Dictionary<string, string[]>(StringComparer.Ordinal);

        if (string.IsNullOrWhiteSpace(request.Account))
        {
            errors[nameof(LoginRequest.Account)] = ["Account is required."];
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            errors[nameof(LoginRequest.Password)] = ["Password is required."];
        }

        return errors;
    }
}
