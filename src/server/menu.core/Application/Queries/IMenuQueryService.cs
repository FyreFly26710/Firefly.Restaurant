namespace Firefly.Restaurant.Menu.Core.Application.Queries;

public interface IMenuQueryService
{
    Task<IReadOnlyList<MenuCategoryReadModel>> GetMenuCategoriesAsync(CancellationToken cancellationToken = default);

    Task<MenuItemReadModel?> GetMenuItemBySlugAsync(string slug, CancellationToken cancellationToken = default);

    Task<ShopProfileReadModel?> GetShopProfileAsync(CancellationToken cancellationToken = default);
}
