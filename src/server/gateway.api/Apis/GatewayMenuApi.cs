using Firefly.Restaurant.Gateway.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Firefly.Restaurant.Gateway.Api.Apis;

public static class GatewayMenuApi
{
    public static IEndpointRouteBuilder MapGatewayMenuApi(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/menu/items")
            .WithTags("Menu");

        group.MapGet("", GetMenuItemsAsync)
            .WithName("GatewayGetMenuItems");

        group.MapGet("{slug}", GetMenuItemBySlugAsync)
            .WithName("GatewayGetMenuItemBySlug");

        return endpoints;
    }

    private static async Task<Ok<IReadOnlyList<MenuItemResponse>>> GetMenuItemsAsync(
        IMenuQueryService menuQueryService,
        CancellationToken cancellationToken)
    {
        var items = await menuQueryService.GetMenuItemsAsync(cancellationToken);
        IReadOnlyList<MenuItemResponse> response = items
            .Select(item => item.ToGatewayResponse())
            .ToArray();

        return TypedResults.Ok(response);
    }

    private static async Task<Results<Ok<MenuItemResponse>, NotFound>> GetMenuItemBySlugAsync(
        string slug,
        IMenuQueryService menuQueryService,
        CancellationToken cancellationToken)
    {
        var item = await menuQueryService.GetMenuItemBySlugAsync(slug, cancellationToken);

        return item is null
            ? TypedResults.NotFound()
            : TypedResults.Ok(item.ToGatewayResponse());
    }
}
