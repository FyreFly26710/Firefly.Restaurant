using Firefly.Restaurant.Menu.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Firefly.Restaurant.Menu.Api.Apis;

public static class MenuApi
{
    public static IEndpointRouteBuilder MapMenuApi(this IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/menu")
            .WithTags("Menu");

        group.MapGet("categories", GetMenuCategoriesAsync)
            .WithName("GetMenuCategories");

        group.MapGet("items/{slug}", GetMenuItemBySlugAsync)
            .WithName("GetMenuItemBySlug");

        return endpoints;
    }

    private static async Task<Ok<List<MenuCategoryResponse>>> GetMenuCategoriesAsync(
        IMenuQueryService menuQueryService,
        CancellationToken cancellationToken)
    {
        var categories = await menuQueryService.GetMenuCategoriesAsync(cancellationToken);
        var response = categories
            .Select(category => category.ToResponse())
            .ToList();

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
