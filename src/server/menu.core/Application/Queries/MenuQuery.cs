using Firefly.Restaurant.Menu.Core.Domain.Entities;
using Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.Menu.Core.Application.Queries;

internal sealed class MenuQuery(MenuDbContext dbContext) : IMenuQueryService
{
    public async Task<IReadOnlyList<MenuCategoryReadModel>> GetMenuCategoriesAsync(CancellationToken cancellationToken = default)
    {
        var categories = await dbContext.MenuCategories
            .AsNoTracking()
            .AsSplitQuery()
            .Include(category => category.Items)
            .ThenInclude(item => item.Tags)
            .OrderBy(category => category.DisplayOrder)
            .ThenBy(category => category.DisplayName)
            .ToListAsync(cancellationToken);

        return categories
            .Select(ToReadModel)
            .ToArray();
    }

    public async Task<MenuItemReadModel?> GetMenuItemBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var normalizedSlug = slug.Trim();

        var item = await dbContext.MenuItems
            .AsNoTracking()
            .Include(menuItem => menuItem.Tags)
            .FirstOrDefaultAsync(
                menuItem => menuItem.Slug == normalizedSlug,
                cancellationToken);

        return item is null
            ? null
            : ToReadModel(item);
    }

    private static MenuCategoryReadModel ToReadModel(MenuCategory category)
    {
        return new MenuCategoryReadModel(
            Id: category.Id,
            Slug: category.Slug,
            DisplayName: category.DisplayName,
            Description: category.Description,
            DisplayOrder: category.DisplayOrder,
            Items: category.Items
                .OrderBy(item => item.DisplayOrder)
                .ThenBy(item => item.Name)
                .Select(ToReadModel)
                .ToArray());
    }

    private static MenuItemReadModel ToReadModel(MenuItem item)
    {
        return new MenuItemReadModel(
            Id: item.Id,
            Slug: item.Slug,
            Name: item.Name,
            Description: item.Description,
            Price: item.Price,
            Available: item.Available,
            DisplayOrder: item.DisplayOrder,
            ImageUrl: item.ImageUrl,
            Tags: item.Tags
                .OrderBy(tag => tag.Value)
                .Select(ToReadModel)
                .ToArray());
    }

    private static MenuItemTagReadModel ToReadModel(MenuItemTag tag)
    {
        return new MenuItemTagReadModel(
            Id: tag.Id,
            Value: tag.Value,
            Color: tag.Color);
    }
}
