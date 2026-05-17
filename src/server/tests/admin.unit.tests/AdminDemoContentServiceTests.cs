using Firefly.Restaurant.Admin.App.Application.Commands;
using Firefly.Restaurant.Admin.App.Application.Queries;
using Firefly.Restaurant.Admin.App.Infrastructure.Demo;

namespace Firefly.Restaurant.Admin.UnitTests;

[TestClass]
public sealed class AdminDemoContentServiceTests
{
    [TestMethod]
    public async Task Query_ReturnsDemoShopAndMenuSnapshot()
    {
        var store = new AdminDemoContentStore();
        var query = new AdminContentQuery(store);

        var dashboard = await query.GetDashboardAsync();

        Assert.AreEqual("Firefly Restaurant", dashboard.Shop.DisplayName);
        Assert.IsGreaterThanOrEqualTo(3, dashboard.Categories.Count);
        Assert.IsGreaterThanOrEqualTo(4, dashboard.MenuItems.Count);
        Assert.IsTrue(dashboard.MenuItems.Any(item => item.Available));
    }

    [TestMethod]
    public async Task UpdateShopProfile_TrimsEditableDisplayFields()
    {
        var store = new AdminDemoContentStore();
        var commandService = new AdminContentCommandService(store);
        var query = new AdminContentQuery(store);

        await commandService.UpdateShopProfileAsync(new UpdateShopProfileCommand(
            DisplayName: " Firefly Counter ",
            Tagline: " Lunch, dinner, and catering ",
            HomeHeadline: " Seasonal cooking ",
            HomeDescription: " Daily menu edited from admin. ",
            ContactIntro: " Call ahead for large tables. ",
            PhoneNumber: " 020 7000 0000 ",
            AddressLine1: " 22 Market Yard ",
            City: " London ",
            PostalCode: " E1 6AA "));

        var dashboard = await query.GetDashboardAsync();

        Assert.AreEqual("Firefly Counter", dashboard.Shop.DisplayName);
        Assert.AreEqual("Lunch, dinner, and catering", dashboard.Shop.Tagline);
        Assert.AreEqual("020 7000 0000", dashboard.Shop.PhoneNumber);
        Assert.AreEqual("22 Market Yard", dashboard.Shop.AddressLine1);
    }

    [TestMethod]
    public async Task ToggleMenuItemAvailability_UpdatesSelectedItemOnly()
    {
        var store = new AdminDemoContentStore();
        var commandService = new AdminContentCommandService(store);
        var query = new AdminContentQuery(store);
        var before = await query.GetDashboardAsync();
        var selectedItem = before.MenuItems.First();
        var otherItem = before.MenuItems.Last(item => item.Id != selectedItem.Id);

        await commandService.ToggleMenuItemAvailabilityAsync(new ToggleMenuItemAvailabilityCommand(
            Id: selectedItem.Id,
            Available: !selectedItem.Available));

        var after = await query.GetDashboardAsync();

        Assert.AreEqual(!selectedItem.Available, after.MenuItems.Single(item => item.Id == selectedItem.Id).Available);
        Assert.AreEqual(otherItem.Available, after.MenuItems.Single(item => item.Id == otherItem.Id).Available);
    }

    [TestMethod]
    public async Task UpdateMenuItem_ReplacesEditableMenuFields()
    {
        var store = new AdminDemoContentStore();
        var commandService = new AdminContentCommandService(store);
        var query = new AdminContentQuery(store);
        var item = (await query.GetDashboardAsync()).MenuItems.First();

        await commandService.UpdateMenuItemAsync(new UpdateMenuItemCommand(
            Id: item.Id,
            CategoryId: item.CategoryId,
            Name: " Firefly Tart ",
            Description: " Citrus, cream, and crisp pastry. ",
            Price: 12.50m,
            Available: false,
            Tags: "dessert, seasonal"));

        var updated = (await query.GetDashboardAsync()).MenuItems.Single(current => current.Id == item.Id);

        Assert.AreEqual("Firefly Tart", updated.Name);
        Assert.AreEqual("Citrus, cream, and crisp pastry.", updated.Description);
        Assert.AreEqual(12.50m, updated.Price);
        Assert.IsFalse(updated.Available);
        CollectionAssert.AreEqual(new[] { "dessert", "seasonal" }, updated.Tags.ToArray());
    }
}
