using Firefly.Restaurant.Menu.Core.Domain.Entities;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class MenuItemTagTests
{
    [TestMethod]
    public void Constructor_NormalizesValue()
    {
        var tag = new MenuItemTag(" GF ");

        Assert.AreEqual("gf", tag.Value);
    }

    [TestMethod]
    public void Constructor_RejectsBlankValue()
    {
        Assert.ThrowsExactly<ArgumentException>(() => new MenuItemTag(" "));
    }
}
