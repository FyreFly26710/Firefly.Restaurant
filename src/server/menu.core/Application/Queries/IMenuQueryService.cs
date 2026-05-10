namespace Firefly.Restaurant.Menu.Core.Application.Queries;

public interface IMenuQueryService
{
    Task<IReadOnlyList<MenuItemReadModel>> GetMenuItemsAsync(CancellationToken cancellationToken = default);

    Task<MenuItemReadModel?> GetMenuItemBySlugAsync(string slug, CancellationToken cancellationToken = default);
}
