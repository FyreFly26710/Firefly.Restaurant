namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class MenuCategory
{
    private readonly List<MenuItem> items = [];

    private MenuCategory()
    {
    }

    public MenuCategory(
        string slug,
        string displayName,
        string description,
        int displayOrder)
    {
        Slug = RequireText(slug, nameof(slug));
        DisplayName = RequireText(displayName, nameof(displayName));
        Description = description.Trim();
        DisplayOrder = RequireNonNegative(displayOrder, nameof(displayOrder));
    }

    public int Id { get; private set; }

    /// <summary>
    /// Editable id displayed in the menu. Can be a number such as "1" or a letter-number code such as "S10". Must be unique.
    /// </summary>
    public string Slug { get; private set; } = string.Empty;

    public string DisplayName { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public int DisplayOrder { get; private set; }

    public IReadOnlyList<MenuItem> Items => items;

    public MenuItem AddItem(
        string slug,
        string name,
        string description,
        decimal price,
        bool available,
        int displayOrder,
        string? imageUrl = null,
        IEnumerable<MenuItemTag>? tags = null)
    {
        var item = new MenuItem(
            category: this,
            slug: slug,
            name: name,
            description: description,
            price: price,
            available: available,
            displayOrder: displayOrder,
            imageUrl: imageUrl,
            tags: tags);

        items.Add(item);

        return item;
    }

    internal static string RequireText(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", parameterName);
        }

        return value.Trim();
    }

    internal static string? TrimOptionalText(string? value)
    {
        return string.IsNullOrWhiteSpace(value)
            ? null
            : value.Trim();
    }

    internal static int RequireNonNegative(int value, string parameterName)
    {
        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(parameterName, value, "Value cannot be negative.");
        }

        return value;
    }
}
