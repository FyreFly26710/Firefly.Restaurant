using System.Net;
using System.Net.Http.Json;
using Firefly.Restaurant.Menu.Core.Application.Queries;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
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

    private static WebApplicationFactory<Program> CreateFactory()
    {
        return new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
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
}
