using Firefly.Restaurant.Admin.App.Application.Commands;
using Firefly.Restaurant.Admin.App.Application.Models;

namespace Firefly.Restaurant.Admin.App.Infrastructure.Demo;

internal sealed class AdminDemoContentStore
{
    private readonly object syncRoot = new();
    private readonly List<MenuCategoryEditorModel> categories;
    private readonly List<MenuItemEditorModel> menuItems;
    private ShopProfileEditorModel shop;
    private DateTimeOffset lastUpdatedAt;

    public AdminDemoContentStore()
    {
        categories =
        [
            new("starters", "Starters", "Small plates and first bites."),
            new("mains", "Mains", "Firefly signatures and larger plates."),
            new("desserts", "Desserts", "A short finish for the table."),
            new("drinks", "Drinks", "House pours and zero-proof serves.")
        ];

        menuItems =
        [
            new(
                Id: "starter-01",
                CategoryId: "starters",
                Name: "Charred Sourdough",
                Description: "Cultured butter, sea salt, and roasted garlic.",
                Price: 7.50m,
                Available: true,
                Tags: ["vegetarian"]),
            new(
                Id: "starter-02",
                CategoryId: "starters",
                Name: "Garden Tomato Salad",
                Description: "Basil, pickled shallot, and toasted seed crumb.",
                Price: 11.00m,
                Available: true,
                Tags: ["vegan", "gluten-free"]),
            new(
                Id: "main-01",
                CategoryId: "mains",
                Name: "Oak-Roasted Chicken",
                Description: "Herb jus, lemon, and hearth potatoes.",
                Price: 26.00m,
                Available: true,
                Tags: ["signature"]),
            new(
                Id: "main-02",
                CategoryId: "mains",
                Name: "Market Fish",
                Description: "Brown butter, capers, and seasonal greens.",
                Price: 29.00m,
                Available: false,
                Tags: ["limited"]),
            new(
                Id: "dessert-01",
                CategoryId: "desserts",
                Name: "Honey Panna Cotta",
                Description: "Poached rhubarb and oat crumble.",
                Price: 10.00m,
                Available: true,
                Tags: ["vegetarian"]),
            new(
                Id: "drink-01",
                CategoryId: "drinks",
                Name: "House Spritz",
                Description: "Citrus, rosemary, soda, and bitter orange.",
                Price: 9.00m,
                Available: true,
                Tags: ["zero-proof"])
        ];

        shop = new ShopProfileEditorModel(
            DisplayName: "Firefly Restaurant",
            Tagline: "Seasonal cooking for the neighborhood",
            HomeHeadline: "Menu updates, service notes, and shop details in one place.",
            HomeDescription: "This Blazor admin demo edits local menu and shop data without making HTTP API calls.",
            ContactIntro: "Use this demo surface to shape public-facing contact and menu content before persistence is wired.",
            PhoneNumber: "020 7946 0100",
            AddressLine1: "10 Firefly Lane",
            City: "London",
            PostalCode: "SE1 1AA",
            HeroImageUrl: "https://images.example.invalid/shop/firefly-admin-hero.jpg",
            OpeningHours:
            [
                new("Mon", "17:00", "22:00", false, null),
                new("Tue", "17:00", "22:00", false, null),
                new("Wed", "17:00", "22:30", false, "Late kitchen"),
                new("Thu", "17:00", "22:30", false, null),
                new("Fri", "12:00", "23:00", false, null),
                new("Sat", "12:00", "23:00", false, null),
                new("Sun", "", "", true, "Private events")
            ]);

        lastUpdatedAt = DateTimeOffset.UtcNow;
    }

    public AdminContentDashboard GetSnapshot()
    {
        lock (syncRoot)
        {
            return CreateSnapshot();
        }
    }

    public AdminContentDashboard UpdateShopProfile(UpdateShopProfileCommand command)
    {
        lock (syncRoot)
        {
            shop = shop with
            {
                DisplayName = RequireText(command.DisplayName, nameof(command.DisplayName)),
                Tagline = RequireText(command.Tagline, nameof(command.Tagline)),
                HomeHeadline = RequireText(command.HomeHeadline, nameof(command.HomeHeadline)),
                HomeDescription = RequireText(command.HomeDescription, nameof(command.HomeDescription)),
                ContactIntro = RequireText(command.ContactIntro, nameof(command.ContactIntro)),
                PhoneNumber = RequireText(command.PhoneNumber, nameof(command.PhoneNumber)),
                AddressLine1 = RequireText(command.AddressLine1, nameof(command.AddressLine1)),
                City = RequireText(command.City, nameof(command.City)),
                PostalCode = RequireText(command.PostalCode, nameof(command.PostalCode))
            };

            lastUpdatedAt = DateTimeOffset.UtcNow;

            return CreateSnapshot();
        }
    }

    public AdminContentDashboard UpdateMenuItem(UpdateMenuItemCommand command)
    {
        lock (syncRoot)
        {
            var index = menuItems.FindIndex(item => item.Id == RequireText(command.Id, nameof(command.Id)));
            if (index < 0)
            {
                throw new InvalidOperationException($"Menu item '{command.Id}' was not found.");
            }

            var categoryId = RequireText(command.CategoryId, nameof(command.CategoryId));
            if (categories.All(category => category.Id != categoryId))
            {
                throw new InvalidOperationException($"Menu category '{categoryId}' was not found.");
            }

            if (command.Price < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(command.Price), command.Price, "Price cannot be negative.");
            }

            menuItems[index] = menuItems[index] with
            {
                CategoryId = categoryId,
                Name = RequireText(command.Name, nameof(command.Name)),
                Description = RequireText(command.Description, nameof(command.Description)),
                Price = command.Price,
                Available = command.Available,
                Tags = NormalizeTags(command.Tags)
            };

            lastUpdatedAt = DateTimeOffset.UtcNow;

            return CreateSnapshot();
        }
    }

    public AdminContentDashboard ToggleMenuItemAvailability(ToggleMenuItemAvailabilityCommand command)
    {
        lock (syncRoot)
        {
            var index = menuItems.FindIndex(item => item.Id == RequireText(command.Id, nameof(command.Id)));
            if (index < 0)
            {
                throw new InvalidOperationException($"Menu item '{command.Id}' was not found.");
            }

            menuItems[index] = menuItems[index] with
            {
                Available = command.Available
            };
            lastUpdatedAt = DateTimeOffset.UtcNow;

            return CreateSnapshot();
        }
    }

    private AdminContentDashboard CreateSnapshot()
    {
        return new AdminContentDashboard(
            Shop: shop with
            {
                OpeningHours = shop.OpeningHours.ToArray()
            },
            Categories: categories.ToArray(),
            MenuItems: menuItems
                .OrderBy(item => categories.FindIndex(category => category.Id == item.CategoryId))
                .ThenBy(item => item.Name, StringComparer.Ordinal)
                .Select(item => item with
                {
                    Tags = item.Tags.ToArray()
                })
                .ToArray(),
            LastUpdatedAt: lastUpdatedAt);
    }

    private static string RequireText(string value, string parameterName)
    {
        var normalizedValue = value.Trim();
        if (normalizedValue.Length == 0)
        {
            throw new ArgumentException("Value cannot be empty.", parameterName);
        }

        return normalizedValue;
    }

    private static IReadOnlyList<string> NormalizeTags(string value)
    {
        var tags = value
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Where(tag => tag.Length > 0);

        var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var normalizedTags = new List<string>();
        foreach (var tag in tags)
        {
            if (seen.Add(tag))
            {
                normalizedTags.Add(tag);
            }
        }

        return normalizedTags;
    }
}
