using Firefly.Restaurant.Menu.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Firefly.Restaurant.Menu.Api.Apis;

public static class MenuApi
{
    public static IEndpointRouteBuilder MapMenuApi(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/menu/items")
            .WithTags("Menu");

        group.MapGet("", GetMenuItemsAsync)
            .WithName("GetMenuItems");

        group.MapGet("{slug}", GetMenuItemBySlugAsync)
            .WithName("GetMenuItemBySlug");

        return endpoints;
    }

    private static async Task<Ok<IReadOnlyList<MenuItemResponse>>> GetMenuItemsAsync(
        IMenuQueryService menuQueryService,
        CancellationToken cancellationToken)
    {
        var items = await menuQueryService.GetMenuItemsAsync(cancellationToken);
        IReadOnlyList<MenuItemResponse> response = items
            .Select(item => item.ToResponse())
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
            : TypedResults.Ok(item.ToResponse());
    }
}
