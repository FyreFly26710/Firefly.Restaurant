using Firefly.Restaurant.Menu.Core.Domain.Entities;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class MenuCategoryTests
{
    [TestMethod]
    public void Constructor_TrimsCategoryFields()
    {
        var category = new MenuCategory(
            slug: " starters ",
            displayName: " Starters ",
            description: " Small plates. ",
            displayOrder: 1);

        Assert.AreEqual("starters", category.Slug);
        Assert.AreEqual("Starters", category.DisplayName);
        Assert.AreEqual("Small plates.", category.Description);
        Assert.AreEqual(1, category.DisplayOrder);
    }

    [TestMethod]
    public void AddItem_AddsItemToCategory()
    {
        var category = new MenuCategory(
            slug: "S",
            displayName: "Starters",
            description: "Small plates.",
            displayOrder: 1);

        var item = category.AddItem(
            slug: "S10",
            name: "Charred Sourdough",
            description: "Cultured butter.",
            price: 7.50m,
            available: true,
            displayOrder: 1);

        Assert.AreSame(item, category.Items.Single());
        Assert.AreSame(category, item.Category);
    }

    [TestMethod]
    public void Constructor_RejectsBlankSlug()
    {
        Assert.ThrowsExactly<ArgumentException>(() =>
            new MenuCategory(
                slug: " ",
                displayName: "Starters",
                description: "Small plates.",
                displayOrder: 1));
    }

    [TestMethod]
    public void Constructor_RejectsNegativeDisplayOrder()
    {
        Assert.ThrowsExactly<ArgumentOutOfRangeException>(() =>
            new MenuCategory(
                slug: "starters",
                displayName: "Starters",
                description: "Small plates.",
                displayOrder: -1));
    }
}
