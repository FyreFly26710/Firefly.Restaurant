using Firefly.Restaurant.Menu.Core.Domain.Entities;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class MenuItemTagTests
{
    [TestMethod]
    public void Constructor_NormalizesValue()
    {
        var tag = new MenuItemTag(" GF ", " #2563EB ");

        Assert.AreEqual("gf", tag.Value);
        Assert.AreEqual("#2563EB", tag.Color);
    }

    [TestMethod]
    public void Constructor_RejectsBlankValue()
    {
        Assert.ThrowsExactly<ArgumentException>(() => new MenuItemTag(" ", "#2563EB"));
    }

    [TestMethod]
    public void Constructor_RejectsBlankColor()
    {
        Assert.ThrowsExactly<ArgumentException>(() => new MenuItemTag("gf", " "));
    }
}
