using Firefly.Restaurant.Menu.Core.Domain.ValueObjects;

namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class ShopProfile
{
    private readonly List<ShopOpeningHour> openingHours = [];

    private ShopProfile()
    {
    }

    public ShopProfile(
        string slug,
        string displayName,
        string homeHeadline,
        string homeDescription,
        string contactIntro,
        string logoImageUrl,
        string heroImageUrl,
        ShopContactDetails contactDetails)
    {
        ArgumentNullException.ThrowIfNull(contactDetails);

        Slug = RequireText(slug, nameof(slug));
        DisplayName = RequireText(displayName, nameof(displayName));
        HomeHeadline = RequireText(homeHeadline, nameof(homeHeadline));
        HomeDescription = RequireText(homeDescription, nameof(homeDescription));
        ContactIntro = RequireText(contactIntro, nameof(contactIntro));
        LogoImageUrl = RequireText(logoImageUrl, nameof(logoImageUrl));
        HeroImageUrl = RequireText(heroImageUrl, nameof(heroImageUrl));
        ContactDetails = contactDetails;
    }

    public int Id { get; private set; }

    public string Slug { get; private set; } = string.Empty;

    public string DisplayName { get; private set; } = string.Empty;

    public string HomeHeadline { get; private set; } = string.Empty;

    public string HomeDescription { get; private set; } = string.Empty;

    public string ContactIntro { get; private set; } = string.Empty;

    public string LogoImageUrl { get; private set; } = string.Empty;

    public string HeroImageUrl { get; private set; } = string.Empty;

    public ShopContactDetails ContactDetails { get; private set; } = null!;

    public IReadOnlyList<ShopOpeningHour> OpeningHours => openingHours;

    public ShopOpeningHour AddOpeningHour(
        DayOfWeek dayOfWeek,
        TimeOnly opensAt,
        TimeOnly closesAt,
        string? note = null)
    {
        var openingHour = new ShopOpeningHour(
            shopProfile: this,
            dayOfWeek: dayOfWeek,
            opensAt: opensAt,
            closesAt: closesAt,
            isClosed: false,
            note: note);

        ReplaceOpeningHour(openingHour);

        return openingHour;
    }

    public ShopOpeningHour AddClosedDay(DayOfWeek dayOfWeek, string? note = null)
    {
        var openingHour = new ShopOpeningHour(
            shopProfile: this,
            dayOfWeek: dayOfWeek,
            opensAt: null,
            closesAt: null,
            isClosed: true,
            note: note);

        ReplaceOpeningHour(openingHour);

        return openingHour;
    }

    internal static string RequireText(string value, string parameterName)
    {
        return ShopContactDetails.RequireText(value, parameterName);
    }

    internal static string? TrimOptionalText(string? value)
    {
        return ShopContactDetails.TrimOptionalText(value);
    }

    private void ReplaceOpeningHour(ShopOpeningHour openingHour)
    {
        var existingOpeningHour = openingHours.SingleOrDefault(current => current.DayOfWeek == openingHour.DayOfWeek);

        if (existingOpeningHour is not null)
        {
            openingHours.Remove(existingOpeningHour);
        }

        openingHours.Add(openingHour);
        openingHours.Sort((left, right) => left.DayOfWeek.CompareTo(right.DayOfWeek));
    }
}
