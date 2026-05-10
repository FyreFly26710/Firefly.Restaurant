using Firefly.Restaurant.Menu.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;

namespace Firefly.Restaurant.Menu.Api.Apis;

internal static class MenuApiMappers
{
    public static MenuItemResponse ToResponse(this MenuItemReadModel item)
    {
        return new MenuItemResponse(
            Slug: item.Slug,
            Name: item.Name,
            Description: item.Description,
            Category: item.Category,
            Price: item.Price,
            Available: item.Available,
            Tags: item.Tags);
    }
}
