using Firefly.Restaurant.Menu.Core.Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;

public sealed class MenuDbContextSeed : IDbSeeder<MenuDbContext>
{
    public async Task SeedAsync(MenuDbContext context)
    {
        if (await context.MenuCategories.AnyAsync())
        {
            return;
        }

        var starters = new MenuCategory(
            slug: "S",
            displayName: "Starters",
            description: "Small plates from the kitchen.",
            displayOrder: 1);

        starters.AddItem(
            slug: "S10",
            name: "Charred Sourdough",
            description: "Warm sourdough with cultured butter.",
            price: 7.50m,
            available: true,
            displayOrder: 1,
            tags:
            [
                new MenuItemTag("vegetarian", "#2F855A")
            ]);

        var mains = new MenuCategory(
            slug: "M",
            displayName: "Mains",
            description: "Larger plates from the hearth.",
            displayOrder: 2);

        mains.AddItem(
            slug: "M10",
            name: "Oak-fired Hake",
            description: "Line-caught hake with lemon leaf butter, sea herbs, and crisp potatoes.",
            price: 24.00m,
            available: true,
            displayOrder: 1,
            imageUrl: "https://images.example.invalid/menu/oak-fired-hake.jpg",
            tags:
            [
                new MenuItemTag("fish", "#2563EB")
            ]);

        var desserts = new MenuCategory(
            slug: "D",
            displayName: "Desserts",
            description: "Sweet finishes.",
            displayOrder: 3);

        desserts.AddItem(
            slug: "D10",
            name: "Molten Chocolate Tart",
            description: "Dark chocolate tart with malt cream and preserved cherry.",
            price: 9.50m,
            available: true,
            displayOrder: 1,
            tags:
            [
                new MenuItemTag("vegetarian", "#2F855A")
            ]);

        context.MenuCategories.AddRange(starters, mains, desserts);
        await context.SaveChangesAsync();
    }
}
