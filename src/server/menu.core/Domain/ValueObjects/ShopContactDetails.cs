namespace Firefly.Restaurant.Menu.Core.Domain.ValueObjects;

public sealed class ShopContactDetails
{
    private ShopContactDetails()
    {
    }

    public ShopContactDetails(
        string phoneNumber,
        string addressLine1,
        string? addressLine2,
        string city,
        string? region,
        string postalCode,
        string country,
        string? mapUrl)
    {
        PhoneNumber = RequireText(phoneNumber, nameof(phoneNumber));
        AddressLine1 = RequireText(addressLine1, nameof(addressLine1));
        AddressLine2 = TrimOptionalText(addressLine2);
        City = RequireText(city, nameof(city));
        Region = TrimOptionalText(region);
        PostalCode = RequireText(postalCode, nameof(postalCode));
        Country = RequireText(country, nameof(country));
        MapUrl = TrimOptionalText(mapUrl);
    }

    public string PhoneNumber { get; private set; } = string.Empty;

    public string AddressLine1 { get; private set; } = string.Empty;

    public string? AddressLine2 { get; private set; }

    public string City { get; private set; } = string.Empty;

    public string? Region { get; private set; }

    public string PostalCode { get; private set; } = string.Empty;

    public string Country { get; private set; } = string.Empty;

    public string? MapUrl { get; private set; }

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
}
