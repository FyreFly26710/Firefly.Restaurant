using System.Net;
using System.Net.Http.Json;
using Firefly.Restaurant.Menu.Core.Application.Queries;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.Menu.FunctionalTests;

[TestClass]
public sealed class MenuEndpointsTests
{
    [TestMethod]
    public async Task GetMenuCategories_ReturnsCategoriesContainingMenuItems()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        var categories = await client.GetFromJsonAsync<List<MenuCategoryResponse>>("/api/menu/categories");

        Assert.IsNotNull(categories);
        Assert.IsGreaterThanOrEqualTo(categories.Count, 2);

        var starters = categories.Single(category => category.Slug == "S");
        var item = starters.Items.Single(menuItem => menuItem.Slug == "S10");

        Assert.AreEqual("Starters", starters.DisplayName);
        Assert.AreEqual("Charred Sourdough", item.Name);
        Assert.AreEqual("vegetarian", item.Tags.Single().Value);
        Assert.AreEqual("#2F855A", item.Tags.Single().Color);
    }

    [TestMethod]
    public async Task GetMenuItemBySlug_ReturnsMatchingMenuItem()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        var item = await client.GetFromJsonAsync<MenuItemResponse>("/api/menu/items/S10");

        Assert.IsNotNull(item);
        Assert.AreEqual(10, item.Id);
        Assert.AreEqual("S10", item.Slug);
        Assert.AreEqual("Charred Sourdough", item.Name);
        Assert.AreEqual("https://images.example.invalid/menu/charred-sourdough.jpg", item.ImageUrl);
        Assert.IsTrue(item.Available);
    }

    [TestMethod]
    public async Task GetMenuItemBySlug_ReturnsNotFoundForMissingMenuItem()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/menu/items/not-on-menu");

        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    [TestMethod]
    public async Task GetShopProfile_ReturnsDisplayDataForHomeAndContactPages()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        var profile = await client.GetFromJsonAsync<ShopProfileResponse>("/api/menu/shop");

        Assert.IsNotNull(profile);
        Assert.AreEqual("firefly", profile.Slug);
        Assert.AreEqual("Firefly Restaurant", profile.DisplayName);
        Assert.AreEqual("Seasonal cooking by the river", profile.HomeHeadline);
        Assert.AreEqual("https://images.example.invalid/shop/logo.png", profile.LogoImageUrl);
        Assert.AreEqual("020 7946 0100", profile.ContactDetails.PhoneNumber);
        Assert.AreEqual("10 Firefly Lane", profile.ContactDetails.AddressLine1);
        Assert.HasCount(2, profile.OpeningHours);
        Assert.AreEqual("Monday", profile.OpeningHours[0].DayOfWeek);
        Assert.AreEqual(new TimeOnly(17, 0), profile.OpeningHours[0].OpensAt);
        Assert.AreEqual(new TimeOnly(22, 0), profile.OpeningHours[0].ClosesAt);
        Assert.IsFalse(profile.OpeningHours[0].IsClosed);
        Assert.AreEqual("Sunday", profile.OpeningHours[1].DayOfWeek);
        Assert.IsTrue(profile.OpeningHours[1].IsClosed);
        Assert.IsNull(profile.OpeningHours[1].OpensAt);
    }

    private static WebApplicationFactory<Program> CreateFactory()
    {
        return new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing");
                builder.ConfigureAppConfiguration((_, configuration) =>
                {
                    configuration.AddInMemoryCollection(new Dictionary<string, string?>
                    {
                        ["ConnectionStrings:MenuDb"] = "Host=localhost;Port=5432;Database=firefly_restaurant_testing;Username=firefly;Password=firefly_dev_password"
                    });
                });
                builder.ConfigureServices(services =>
                {
                    services.RemoveAll<IMenuQueryService>();
                    services.AddSingleton<IMenuQueryService>(TestMenuQueryService.Instance);
                });
            });
    }

    private sealed class TestMenuQueryService : IMenuQueryService
    {
        public static readonly TestMenuQueryService Instance = new();

        private static readonly IReadOnlyList<MenuCategoryReadModel> Categories =
        [
            new(
                Id: 1,
                Slug: "S",
                DisplayName: "Starters",
                Description: "Small plates.",
                DisplayOrder: 1,
                Items:
                [
                    new(
                        Id: 10,
                        Slug: "S10",
                        Name: "Charred Sourdough",
                        Description: "Cultured butter.",
                        Price: 7.50m,
                        Available: true,
                        DisplayOrder: 1,
                        ImageUrl: "https://images.example.invalid/menu/charred-sourdough.jpg",
                        Tags:
                        [
                            new(Id: 100, Value: "vegetarian", Color: "#2F855A")
                        ])
                ]),
            new(
                Id: 2,
                Slug: "M",
                DisplayName: "Mains",
                Description: "Larger plates.",
                DisplayOrder: 2,
                Items:
                [
                    new(
                        Id: 20,
                        Slug: "M10",
                        Name: "Oak-fired Hake",
                        Description: "Lemon leaf butter.",
                        Price: 24.00m,
                        Available: true,
                        DisplayOrder: 1,
                        ImageUrl: null,
                        Tags:
                        [
                            new(Id: 200, Value: "fish", Color: "#2563EB")
                        ])
                ])
        ];

        private static readonly ShopProfileReadModel ShopProfile = new(
            Id: 1,
            Slug: "firefly",
            DisplayName: "Firefly Restaurant",
            HomeHeadline: "Seasonal cooking by the river",
            HomeDescription: "A warm neighborhood restaurant.",
            ContactIntro: "Visit us for dinner.",
            LogoImageUrl: "https://images.example.invalid/shop/logo.png",
            HeroImageUrl: "https://images.example.invalid/shop/hero.jpg",
            ContactDetails: new ShopContactDetailsReadModel(
                PhoneNumber: "020 7946 0100",
                AddressLine1: "10 Firefly Lane",
                AddressLine2: null,
                City: "London",
                Region: null,
                PostalCode: "SE1 1AA",
                Country: "United Kingdom",
                MapUrl: "https://maps.example.invalid/firefly"),
            OpeningHours:
            [
                new(
                    Id: 1,
                    DayOfWeek: DayOfWeek.Monday,
                    OpensAt: new TimeOnly(17, 0),
                    ClosesAt: new TimeOnly(22, 0),
                    IsClosed: false,
                    Note: null),
                new(
                    Id: 2,
                    DayOfWeek: DayOfWeek.Sunday,
                    OpensAt: null,
                    ClosesAt: null,
                    IsClosed: true,
                    Note: "Private events")
            ]);

        public Task<IReadOnlyList<MenuCategoryReadModel>> GetMenuCategoriesAsync(CancellationToken cancellationToken = default)
        {
            return Task.FromResult(Categories);
        }

        public Task<MenuItemReadModel?> GetMenuItemBySlugAsync(string slug, CancellationToken cancellationToken = default)
        {
            var item = Categories
                .SelectMany(category => category.Items)
                .SingleOrDefault(menuItem => string.Equals(menuItem.Slug, slug, StringComparison.Ordinal));

            return Task.FromResult(item);
        }

        public Task<ShopProfileReadModel?> GetShopProfileAsync(CancellationToken cancellationToken = default)
        {
            return Task.FromResult<ShopProfileReadModel?>(ShopProfile);
        }
    }

    private sealed record MenuCategoryResponse(
        int Id,
        string Slug,
        string DisplayName,
        string Description,
        int DisplayOrder,
        List<MenuItemResponse> Items);

    private sealed record MenuItemResponse(
        int Id,
        string Slug,
        string Name,
        string Description,
        decimal Price,
        bool Available,
        int DisplayOrder,
        string? ImageUrl,
        List<ItemTagResponse> Tags);

    private sealed record ItemTagResponse(
        int Id,
        string Value,
        string Color);

    private sealed record ShopProfileResponse(
        int Id,
        string Slug,
        string DisplayName,
        string HomeHeadline,
        string HomeDescription,
        string ContactIntro,
        string LogoImageUrl,
        string HeroImageUrl,
        ShopContactDetailsResponse ContactDetails,
        List<ShopOpeningHourResponse> OpeningHours);

    private sealed record ShopContactDetailsResponse(
        string PhoneNumber,
        string AddressLine1,
        string? AddressLine2,
        string City,
        string? Region,
        string PostalCode,
        string Country,
        string? MapUrl);

    private sealed record ShopOpeningHourResponse(
        int Id,
        string DayOfWeek,
        TimeOnly? OpensAt,
        TimeOnly? ClosesAt,
        bool IsClosed,
        string? Note);
}
