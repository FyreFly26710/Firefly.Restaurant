namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class MenuItem
{
    private readonly List<MenuItemTag> tags = [];

    private MenuItem()
    {
    }

    internal MenuItem(
        MenuCategory category,
        string slug,
        string name,
        string description,
        decimal price,
        bool available,
        int displayOrder,
        string? imageUrl = null,
        IEnumerable<MenuItemTag>? tags = null)
    {
        ArgumentNullException.ThrowIfNull(category);

        Category = category;
        CategoryId = category.Id;
        Slug = MenuCategory.RequireText(slug, nameof(slug));
        Name = MenuCategory.RequireText(name, nameof(name));
        Description = description.Trim();
        Price = RequireNonNegative(price, nameof(price));
        Available = available;
        DisplayOrder = RequireNonNegative(displayOrder, nameof(displayOrder));
        ImageUrl = MenuCategory.TrimOptionalText(imageUrl);

        foreach (var tag in NormalizeTags(tags))
        {
            AddTag(tag);
        }
    }

    public int Id { get; private set; }

    public int CategoryId { get; private set; }

    public MenuCategory Category { get; private set; } = null!;

    /// <summary>
    /// Editable id displayed in the menu. Can be a number such as "1" or a letter-number code such as "S10". Must be unique.
    /// </summary>
    public string Slug { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public decimal Price { get; private set; }

    public bool Available { get; private set; }

    public int DisplayOrder { get; private set; }

    public string? ImageUrl { get; private set; }

    public IReadOnlyList<MenuItemTag> Tags => tags;

    private void AddTag(MenuItemTag tag)
    {
        tag.AttachTo(this);
        tags.Add(tag);
    }

    private static decimal RequireNonNegative(decimal value, string parameterName)
    {
        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(parameterName, value, "Value cannot be negative.");
        }

        return value;
    }

    private static int RequireNonNegative(int value, string parameterName)
    {
        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(parameterName, value, "Value cannot be negative.");
        }

        return value;
    }

    private static IEnumerable<MenuItemTag> NormalizeTags(IEnumerable<MenuItemTag>? tags)
    {
        return tags?
            .GroupBy(tag => tag.Value, StringComparer.Ordinal)
            .Select(tagGroup => tagGroup.First())
            .OrderBy(tag => tag.Value, StringComparer.Ordinal)
            .ToArray() ?? [];
    }
}
