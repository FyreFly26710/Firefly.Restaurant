namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class MenuCategory
{
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

    public string Slug { get; }

    public string DisplayName { get; }

    public string Description { get; }

    public int DisplayOrder { get; }

    private static string RequireText(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", parameterName);
        }

        return value.Trim();
    }

    private static int RequireNonNegative(int value, string parameterName)
    {
        if (value < 0)
        {
            throw new ArgumentOutOfRangeException(parameterName, value, "Value cannot be negative.");
        }

        return value;
    }
}
