using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Firefly.Restaurant.Menu.FunctionalTests;

[TestClass]
public sealed class MenuEndpointsTests
{
    [TestMethod]
    public async Task GetMenuItems_ReturnsMockMenuItems()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var items = await client.GetFromJsonAsync<List<MenuItemResponse>>("/api/menu/items");

        Assert.IsNotNull(items);
        Assert.IsGreaterThanOrEqualTo(items.Count, 3);
        Assert.IsTrue(items.Any(item => item.Slug == "ember-roasted-carrots"));
    }

    [TestMethod]
    public async Task GetMenuItemBySlug_ReturnsMatchingMenuItem()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var item = await client.GetFromJsonAsync<MenuItemResponse>("/api/menu/items/ember-roasted-carrots");

        Assert.IsNotNull(item);
        Assert.AreEqual("ember-roasted-carrots", item.Slug);
        Assert.AreEqual("Ember-roasted carrots", item.Name);
        Assert.AreEqual("Vegetables", item.Category);
        Assert.IsTrue(item.Available);
    }

    [TestMethod]
    public async Task GetMenuItemBySlug_ReturnsNotFoundForMissingMenuItem()
    {
        await using var factory = new WebApplicationFactory<Program>();
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/menu/items/not-on-menu");

        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
    }

    private sealed record MenuItemResponse(
        string Slug,
        string Name,
        string Description,
        string Category,
        decimal Price,
        bool Available,
        IReadOnlyList<string> Tags);
}
