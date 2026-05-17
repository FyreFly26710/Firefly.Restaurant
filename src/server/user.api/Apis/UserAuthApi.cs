using Firefly.Restaurant.User.Api.Contracts.Requests;
using Firefly.Restaurant.User.Api.Contracts.Responses;
using Firefly.Restaurant.User.Core.Application.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Firefly.Restaurant.User.Api.Apis;

public static class UserAuthApi
{
    public static IEndpointRouteBuilder MapUserAuthApi(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/users")
            .WithTags("Users");

        group.MapPost("login", LoginAsync)
            .WithName("LoginUser");

        return endpoints;
    }

    private static async Task<Results<Ok<AuthenticatedUserResponse>, UnauthorizedHttpResult, ValidationProblem>> LoginAsync(
        LoginRequest request,
        IUserAuthenticationService authenticationService,
        CancellationToken cancellationToken)
    {
        var validationErrors = request.GetValidationErrors();
        if (validationErrors.Count > 0)
        {
            return TypedResults.ValidationProblem(validationErrors);
        }

        var authenticatedUser = await authenticationService.AuthenticateAsync(
            request.ToCommand(),
            cancellationToken);

        return authenticatedUser is null
            ? TypedResults.Unauthorized()
            : TypedResults.Ok(authenticatedUser.ToResponse());
    }
}
