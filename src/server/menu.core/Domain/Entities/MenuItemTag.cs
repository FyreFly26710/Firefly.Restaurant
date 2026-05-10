namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed record MenuItemTag
{
    public MenuItemTag(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", nameof(value));
        }

        Value = value.Trim().ToLowerInvariant();
    }

    public string Value { get; }
}
