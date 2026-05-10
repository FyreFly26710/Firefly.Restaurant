namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class MenuItem
{
    public MenuItem(
        string slug,
        string categorySlug,
        string name,
        string description,
        decimal price,
        bool available,
        int displayOrder,
        IEnumerable<MenuItemTag>? tags = null)
    {
        Slug = RequireText(slug, nameof(slug));
        CategorySlug = RequireText(categorySlug, nameof(categorySlug));
        Name = RequireText(name, nameof(name));
        Description = description.Trim();
        Price = RequireNonNegative(price, nameof(price));
        Available = available;
        DisplayOrder = RequireNonNegative(displayOrder, nameof(displayOrder));
        Tags = NormalizeTags(tags);
    }

    public string Slug { get; }

    public string CategorySlug { get; }

    public string Name { get; }

    public string Description { get; }

    public decimal Price { get; }

    public bool Available { get; }

    public int DisplayOrder { get; }

    public IReadOnlyList<MenuItemTag> Tags { get; }

    private static string RequireText(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", parameterName);
        }

        return value.Trim();
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

    private static IReadOnlyList<MenuItemTag> NormalizeTags(IEnumerable<MenuItemTag>? tags)
    {
        return tags?
            .Distinct()
            .OrderBy(tag => tag.Value, StringComparer.Ordinal)
            .ToArray() ?? [];
    }
}
