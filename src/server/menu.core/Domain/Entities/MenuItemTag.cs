namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class MenuItemTag
{
    private MenuItemTag()
    {
    }

    public MenuItemTag(string value, string color)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", nameof(value));
        }

        if (string.IsNullOrWhiteSpace(color))
        {
            throw new ArgumentException("Value cannot be empty.", nameof(color));
        }

        Value = value.Trim().ToLowerInvariant();
        Color = color.Trim();
    }

    public int Id { get; private set; }

    public int MenuItemId { get; private set; }

    public MenuItem MenuItem { get; private set; } = null!;

    public string Value { get; private set; } = string.Empty;

    public string Color { get; private set; } = string.Empty;

    internal void AttachTo(MenuItem menuItem)
    {
        ArgumentNullException.ThrowIfNull(menuItem);

        MenuItem = menuItem;
    }
}
