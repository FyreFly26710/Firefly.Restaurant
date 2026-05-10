using Firefly.Restaurant.Menu.Core.Domain.Entities;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class MenuItemTests
{
    [TestMethod]
    public void Constructor_CapturesMenuItemShape()
    {
        var category = new MenuCategory(
            slug: "S",
            displayName: "Starters",
            description: "Small plates.",
            displayOrder: 1);

        var item = category.AddItem(
            slug: " S10 ",
            name: " Charred Sourdough ",
            description: " Cultured butter. ",
            price: 7.50m,
            available: true,
            displayOrder: 2,
            imageUrl: " https://images.example.invalid/menu/charred-sourdough.jpg ",
            tags:
            [
                new MenuItemTag("V", "#2F855A"),
                new MenuItemTag(" gf ", "#2563EB"),
                new MenuItemTag("v", "#2F855A")
            ]);

        Assert.AreEqual("S10", item.Slug);
        Assert.AreSame(category, item.Category);
        Assert.AreEqual("Charred Sourdough", item.Name);
        Assert.AreEqual("Cultured butter.", item.Description);
        Assert.AreEqual(7.50m, item.Price);
        Assert.IsTrue(item.Available);
        Assert.AreEqual(2, item.DisplayOrder);
        Assert.AreEqual("https://images.example.invalid/menu/charred-sourdough.jpg", item.ImageUrl);
        CollectionAssert.AreEqual(new[] { "gf", "v" }, item.Tags.Select(tag => tag.Value).ToArray());
    }

    [TestMethod]
    public void Constructor_RejectsNegativePrice()
    {
        var category = new MenuCategory(
            slug: "S",
            displayName: "Starters",
            description: "Small plates.",
            displayOrder: 1);

        Assert.ThrowsExactly<ArgumentOutOfRangeException>(() =>
            category.AddItem(
                slug: "S10",
                name: "Charred Sourdough",
                description: "Cultured butter.",
                price: -1m,
                available: true,
                displayOrder: 1));
    }

    [TestMethod]
    public void Constructor_RejectsBlankSlug()
    {
        var category = new MenuCategory(
            slug: "S",
            displayName: "Starters",
            description: "Small plates.",
            displayOrder: 1);

        Assert.ThrowsExactly<ArgumentException>(() =>
            category.AddItem(
                slug: " ",
                name: "Charred Sourdough",
                description: "Cultured butter.",
                price: 7.50m,
                available: true,
                displayOrder: 1));
    }
}
