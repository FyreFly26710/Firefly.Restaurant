using Firefly.Restaurant.Menu.Core.Domain.Entities;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class MenuItemTests
{
    [TestMethod]
    public void Constructor_CapturesMenuItemShape()
    {
        var item = new MenuItem(
            slug: " charred-sourdough ",
            categorySlug: " starters ",
            name: " Charred Sourdough ",
            description: " Cultured butter. ",
            price: 7.50m,
            available: true,
            displayOrder: 2,
            tags:
            [
                new MenuItemTag("V"),
                new MenuItemTag(" gf "),
                new MenuItemTag("v")
            ]);

        Assert.AreEqual("charred-sourdough", item.Slug);
        Assert.AreEqual("starters", item.CategorySlug);
        Assert.AreEqual("Charred Sourdough", item.Name);
        Assert.AreEqual("Cultured butter.", item.Description);
        Assert.AreEqual(7.50m, item.Price);
        Assert.IsTrue(item.Available);
        Assert.AreEqual(2, item.DisplayOrder);
        CollectionAssert.AreEqual(new[] { "gf", "v" }, item.Tags.Select(tag => tag.Value).ToArray());
    }

    [TestMethod]
    public void Constructor_RejectsNegativePrice()
    {
        Assert.ThrowsExactly<ArgumentOutOfRangeException>(() =>
            new MenuItem(
                slug: "charred-sourdough",
                categorySlug: "starters",
                name: "Charred Sourdough",
                description: "Cultured butter.",
                price: -1m,
                available: true,
                displayOrder: 1));
    }

    [TestMethod]
    public void Constructor_RejectsBlankCategorySlug()
    {
        Assert.ThrowsExactly<ArgumentException>(() =>
            new MenuItem(
                slug: "charred-sourdough",
                categorySlug: " ",
                name: "Charred Sourdough",
                description: "Cultured butter.",
                price: 7.50m,
                available: true,
                displayOrder: 1));
    }
}
