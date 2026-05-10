using Firefly.Restaurant.Menu.Core.Application.Queries;

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Services;

internal sealed class MockMenuQueryService : IMenuQueryService
{
    private static readonly MenuItemReadModel[] Items =
    [
        new(
            Slug: "ember-roasted-carrots",
            Name: "Ember-roasted carrots",
            Description: "Charred heritage carrots with smoked yogurt, buckwheat, and garden herbs.",
            Category: "Vegetables",
            Price: 12.50m,
            Available: true,
            Tags: ["vegetarian", "gluten-free"]),
        new(
            Slug: "oak-fired-hake",
            Name: "Oak-fired hake",
            Description: "Line-caught hake with lemon leaf butter, sea herbs, and crisp potatoes.",
            Category: "Seafood",
            Price: 24.00m,
            Available: true,
            Tags: ["fish"]),
        new(
            Slug: "molten-chocolate-tart",
            Name: "Molten chocolate tart",
            Description: "Dark chocolate tart with malt cream and preserved cherry.",
            Category: "Dessert",
            Price: 9.50m,
            Available: true,
            Tags: ["vegetarian"])
    ];

    public Task<IReadOnlyList<MenuItemReadModel>> GetMenuItemsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<MenuItemReadModel>>(Items);
    }

    public Task<MenuItemReadModel?> GetMenuItemBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var item = Items.FirstOrDefault(menuItem =>
            string.Equals(menuItem.Slug, slug, StringComparison.OrdinalIgnoreCase));

        return Task.FromResult(item);
    }
}
