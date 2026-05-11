namespace Firefly.Restaurant.Menu.Core.Domain.Entities;

public sealed class ShopOpeningHour
{
    private ShopOpeningHour()
    {
    }

    internal ShopOpeningHour(
        ShopProfile shopProfile,
        DayOfWeek dayOfWeek,
        TimeOnly? opensAt,
        TimeOnly? closesAt,
        bool isClosed,
        string? note)
    {
        ArgumentNullException.ThrowIfNull(shopProfile);

        if (!isClosed && (opensAt is null || closesAt is null))
        {
            throw new ArgumentException("Open days require opening and closing times.", nameof(opensAt));
        }

        if (opensAt >= closesAt)
        {
            throw new ArgumentException("Closing time must be after opening time.", nameof(closesAt));
        }

        ShopProfile = shopProfile;
        ShopProfileId = shopProfile.Id;
        DayOfWeek = dayOfWeek;
        OpensAt = isClosed ? null : opensAt;
        ClosesAt = isClosed ? null : closesAt;
        IsClosed = isClosed;
        Note = ShopProfile.TrimOptionalText(note);
    }

    public int Id { get; private set; }

    public int ShopProfileId { get; private set; }

    public ShopProfile ShopProfile { get; private set; } = null!;

    public DayOfWeek DayOfWeek { get; private set; }

    public TimeOnly? OpensAt { get; private set; }

    public TimeOnly? ClosesAt { get; private set; }

    public bool IsClosed { get; private set; }

    public string? Note { get; private set; }
}
