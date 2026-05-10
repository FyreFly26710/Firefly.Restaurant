using Firefly.Restaurant.Gateway.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;

namespace Firefly.Restaurant.Gateway.Api.Apis;

internal static class GatewayMenuApiMappers
{
    public static MenuItemResponse ToGatewayResponse(this MenuItemReadModel item)
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
