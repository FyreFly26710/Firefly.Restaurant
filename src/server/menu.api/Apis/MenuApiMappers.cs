using Firefly.Restaurant.Menu.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;

namespace Firefly.Restaurant.Menu.Api.Apis;

internal static class MenuApiMappers
{
    public static MenuCategoryResponse ToResponse(this MenuCategoryReadModel category)
    {
        return new MenuCategoryResponse(
            Id: category.Id,
            Slug: category.Slug,
            DisplayName: category.DisplayName,
            Description: category.Description,
            DisplayOrder: category.DisplayOrder,
            Items: category.Items
                .Select(item => item.ToResponse())
                .ToList());
    }

    public static MenuItemResponse ToResponse(this MenuItemReadModel item)
    {
        return new MenuItemResponse(
            Id: item.Id,
            Slug: item.Slug,
            Name: item.Name,
            Description: item.Description,
            Price: item.Price,
            Available: item.Available,
            DisplayOrder: item.DisplayOrder,
            ImageUrl: item.ImageUrl,
            Tags: item.Tags
                .Select(tag => tag.ToResponse())
                .ToList());
    }

    private static ItemTagResponse ToResponse(this MenuItemTagReadModel tag)
    {
        return new ItemTagResponse(
            Id: tag.Id,
            Value: tag.Value,
            Color: tag.Color);
    }
}
