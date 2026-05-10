using Firefly.Restaurant.Menu.Core.Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;

public sealed class MenuDbContextSeed : IDbSeeder<MenuDbContext>
{
    private static readonly string[] LegacySeedCategorySlugs = ["S", "M", "D"];

    private static readonly MenuCategorySeedData[] Categories =
    [
        new(
            Slug: "APP",
            DisplayName: "Appetisers",
            Description: "Crisp starters, dumplings, ribs, wings, and sharing plates.",
            DisplayOrder: 1,
            Items:
            [
                new("A1", "Vegetarian Spring Rolls", "Crisp pastry rolls filled with cabbage, carrot, mushroom, and glass noodles.", 4.80m, 1, [Tag.Vegetarian]),
                new("A2", "Crispy Seaweed", "Finely shredded greens fried until crisp and finished with sesame sugar.", 4.50m, 2, [Tag.Vegetarian]),
                new("A3", "Sesame Prawn Toast", "Golden toast topped with minced prawn, sesame, and spring onion.", 6.80m, 3, [Tag.Seafood]),
                new("A4", "Salt and Pepper Chicken Wings", "Crispy wings tossed with chilli, garlic, onion, and five-spice salt.", 6.90m, 4, [Tag.Spicy, Tag.Popular]),
                new("A5", "Peking Dumplings", "Pan-fried pork dumplings served with ginger vinegar dipping sauce.", 6.50m, 5, [Tag.Popular]),
                new("A6", "Crispy Wontons", "Crunchy pork and prawn wontons with sweet and sour dip.", 5.90m, 6, [Tag.Seafood]),
                new("A7", "Barbecue Spare Ribs", "Tender pork ribs glazed in sticky Cantonese barbecue sauce.", 7.90m, 7, [Tag.Popular]),
                new("A8", "Aromatic Duck Pancakes", "Shredded aromatic duck with pancakes, cucumber, spring onion, and hoisin.", 12.50m, 8, [Tag.Duck, Tag.Popular])
            ]),
        new(
            Slug: "SOUP",
            DisplayName: "Soups",
            Description: "Classic takeaway soups served hot before the main dishes.",
            DisplayOrder: 2,
            Items:
            [
                new("SO1", "Hot and Sour Soup", "Peppery soup with bamboo shoots, tofu, egg, mushroom, and chilli vinegar.", 4.80m, 1, [Tag.Spicy]),
                new("SO2", "Chicken Sweetcorn Soup", "Silky chicken and sweetcorn soup with ribbons of egg.", 4.60m, 2, [Tag.Popular]),
                new("SO3", "Wonton Soup", "Pork and prawn wontons in light chicken broth with spring onion.", 5.20m, 3, [Tag.Seafood]),
                new("SO4", "Crab Meat Sweetcorn Soup", "Sweetcorn soup with crab meat and soft egg ribbons.", 5.50m, 4, [Tag.Seafood]),
                new("SO5", "Tom Yum King Prawn Soup", "Hot and sour king prawn soup with lemongrass, lime, and chilli.", 5.80m, 5, [Tag.Spicy, Tag.Seafood]),
                new("SO6", "Vegetable Tofu Soup", "Light vegetable broth with tofu, mushrooms, carrots, and greens.", 4.50m, 6, [Tag.Vegetarian])
            ]),
        new(
            Slug: "CHK",
            DisplayName: "Chicken Dishes",
            Description: "Takeaway chicken favourites with sweet, spicy, savoury, and nutty sauces.",
            DisplayOrder: 3,
            Items:
            [
                new("C1", "Sweet and Sour Chicken Hong Kong Style", "Crispy chicken pieces tossed with peppers, pineapple, onion, and sweet sour sauce.", 8.90m, 1, [Tag.Popular]),
                new("C2", "Kung Po Chicken", "Chicken stir-fried with chilli, peppers, onion, and roasted cashews.", 8.90m, 2, [Tag.Spicy, Tag.ContainsNuts]),
                new("C3", "Lemon Chicken", "Crispy chicken breast sliced with glossy lemon sauce.", 8.70m, 3, [Tag.Popular]),
                new("C4", "Chicken with Cashew Nuts", "Tender chicken with cashews, vegetables, and savoury oyster-style sauce.", 8.90m, 4, [Tag.ContainsNuts]),
                new("C5", "Chicken in Black Bean Sauce", "Chicken with peppers and onions in fermented black bean garlic sauce.", 8.80m, 5, [Tag.Popular]),
                new("C6", "Satay Chicken", "Chicken in a rich peanut satay sauce with peppers and onions.", 8.90m, 6, [Tag.ContainsNuts, Tag.Spicy]),
                new("C7", "Chicken with Ginger and Spring Onion", "Chicken wok-fried with fresh ginger, spring onion, and light soy sauce.", 8.80m, 7, [Tag.Classic]),
                new("C8", "Crispy Shredded Chilli Chicken", "Shredded chicken strips in a sticky chilli sauce with carrot and spring onion.", 8.95m, 8, [Tag.Spicy, Tag.Popular])
            ]),
        new(
            Slug: "BEEF",
            DisplayName: "Beef Dishes",
            Description: "Wok-fried beef dishes with classic Chinese takeaway sauces.",
            DisplayOrder: 4,
            Items:
            [
                new("B1", "Beef in Black Bean Sauce", "Sliced beef with peppers, onions, and garlic black bean sauce.", 9.20m, 1, [Tag.Popular]),
                new("B2", "Crispy Chilli Beef", "Crispy shredded beef with carrot, chilli, and tangy sweet sauce.", 9.50m, 2, [Tag.Spicy, Tag.Popular]),
                new("B3", "Beef with Broccoli", "Sliced beef and broccoli in a savoury garlic soy sauce.", 9.20m, 3, [Tag.Classic]),
                new("B4", "Beef with Ginger and Spring Onion", "Tender beef wok-fried with ginger, spring onion, and soy.", 9.20m, 4, [Tag.Classic]),
                new("B5", "Beef in Oyster Sauce", "Sliced beef with mixed vegetables in rich oyster sauce.", 9.10m, 5, [Tag.Classic]),
                new("B6", "Szechuan Beef", "Beef with peppers, onion, carrot, and hot Szechuan chilli sauce.", 9.30m, 6, [Tag.Spicy]),
                new("B7", "Beef Chop Suey", "Beef with bean sprouts, onion, carrot, and light savoury sauce.", 8.90m, 7, [Tag.Classic])
            ]),
        new(
            Slug: "SEA",
            DisplayName: "Prawn and Seafood",
            Description: "King prawn, squid, and mixed seafood dishes from the wok.",
            DisplayOrder: 5,
            Items:
            [
                new("P1", "King Prawn with Cashew Nuts", "King prawns with cashews, vegetables, and savoury sauce.", 10.50m, 1, [Tag.Seafood, Tag.ContainsNuts]),
                new("P2", "Sweet and Sour King Prawn", "Crispy king prawns with peppers, pineapple, onion, and sweet sour sauce.", 10.30m, 2, [Tag.Seafood, Tag.Popular]),
                new("P3", "Salt and Pepper King Prawns", "King prawns tossed with chilli, garlic, onion, and five-spice salt.", 10.80m, 3, [Tag.Seafood, Tag.Spicy]),
                new("P4", "King Prawn in Garlic Sauce", "King prawns stir-fried with vegetables in fragrant garlic sauce.", 10.30m, 4, [Tag.Seafood]),
                new("P5", "Squid with Black Bean Sauce", "Tender squid with peppers and onions in black bean garlic sauce.", 10.20m, 5, [Tag.Seafood]),
                new("P6", "Mixed Seafood in XO Sauce", "Prawns, squid, and fish cake with vegetables in spicy XO-style sauce.", 11.20m, 6, [Tag.Seafood, Tag.Spicy])
            ]),
        new(
            Slug: "RICE",
            DisplayName: "Rice",
            Description: "Fried rice boxes and classic sides for sharing.",
            DisplayOrder: 6,
            Items:
            [
                new("R1", "Egg Fried Rice", "Wok-fried rice with egg, peas, and spring onion.", 4.20m, 1, [Tag.Vegetarian, Tag.Side]),
                new("R2", "Special Fried Rice", "Fried rice with chicken, roast pork, prawns, egg, peas, and spring onion.", 7.80m, 2, [Tag.Popular, Tag.Seafood]),
                new("R3", "Chicken Fried Rice", "Fried rice with diced chicken, egg, peas, and spring onion.", 6.90m, 3, [Tag.Popular]),
                new("R4", "King Prawn Fried Rice", "Fried rice with king prawns, egg, peas, and spring onion.", 8.20m, 4, [Tag.Seafood]),
                new("R5", "Singapore Fried Rice", "Curried fried rice with chicken, prawns, roast pork, egg, and chilli.", 7.90m, 5, [Tag.Spicy, Tag.Seafood]),
                new("R6", "Yeung Chow Fried Rice", "Cantonese fried rice with roast pork, prawns, peas, and egg.", 7.70m, 6, [Tag.Seafood, Tag.Classic]),
                new("R7", "Mushroom Fried Rice", "Fried rice with mushrooms, egg, peas, and spring onion.", 6.20m, 7, [Tag.Vegetarian])
            ]),
        new(
            Slug: "NOOD",
            DisplayName: "Noodles and Chow Mein",
            Description: "Soft noodles, vermicelli, and chow mein takeaway staples.",
            DisplayOrder: 7,
            Items:
            [
                new("N1", "Special Chow Mein", "Soft noodles with chicken, roast pork, prawns, bean sprouts, and onion.", 8.20m, 1, [Tag.Popular, Tag.Seafood]),
                new("N2", "Chicken Chow Mein", "Soft noodles with chicken, bean sprouts, onion, and spring onion.", 7.50m, 2, [Tag.Popular]),
                new("N3", "Beef Chow Mein", "Soft noodles with sliced beef, bean sprouts, onion, and spring onion.", 7.80m, 3, [Tag.Classic]),
                new("N4", "King Prawn Chow Mein", "Soft noodles with king prawns, bean sprouts, onion, and spring onion.", 8.50m, 4, [Tag.Seafood]),
                new("N5", "Singapore Vermicelli", "Thin rice noodles with chicken, prawns, roast pork, curry spice, and chilli.", 8.20m, 5, [Tag.Spicy, Tag.Seafood]),
                new("N6", "Vegetable Chow Mein", "Soft noodles with mixed vegetables, bean sprouts, and spring onion.", 6.90m, 6, [Tag.Vegetarian]),
                new("N7", "Duck Chow Mein", "Soft noodles with roast duck, bean sprouts, and rich soy sauce.", 8.70m, 7, [Tag.Duck])
            ]),
        new(
            Slug: "VEG",
            DisplayName: "Vegetarian and Tofu",
            Description: "Vegetable, tofu, and mushroom dishes with classic takeaway sauces.",
            DisplayOrder: 8,
            Items:
            [
                new("V1", "Vegetable Mapo Tofu", "Tofu and vegetables in a spicy Szechuan bean sauce.", 7.40m, 1, [Tag.Vegetarian, Tag.Spicy]),
                new("V2", "Mixed Vegetables in Garlic Sauce", "Broccoli, mushroom, carrot, bamboo shoots, and greens in garlic sauce.", 7.20m, 2, [Tag.Vegetarian]),
                new("V3", "Salt and Pepper Tofu", "Crispy tofu tossed with chilli, garlic, onion, and five-spice salt.", 7.50m, 3, [Tag.Vegetarian, Tag.Spicy]),
                new("V4", "Sweet and Sour Mixed Vegetables", "Mixed vegetables with pineapple, peppers, onion, and sweet sour sauce.", 7.20m, 4, [Tag.Vegetarian]),
                new("V5", "Tofu with Black Bean Sauce", "Tofu, peppers, and onions in black bean garlic sauce.", 7.40m, 5, [Tag.Vegetarian]),
                new("V6", "Mushroom Foo Yung", "Chinese-style omelette with mushrooms, onion, and beansprouts.", 7.30m, 6, [Tag.Vegetarian])
            ]),
        new(
            Slug: "EXT",
            DisplayName: "Sides and Sauces",
            Description: "Takeaway sides, chips, crackers, and dipping sauces.",
            DisplayOrder: 9,
            Items:
            [
                new("E1", "Curry Sauce", "Classic Chinese takeaway curry sauce.", 2.50m, 1, [Tag.Vegetarian, Tag.Side, Tag.Spicy]),
                new("E2", "Sweet and Sour Sauce", "Bright sweet and sour dipping sauce.", 2.30m, 2, [Tag.Vegetarian, Tag.Side]),
                new("E3", "Chips", "Crisp fried chips.", 3.20m, 3, [Tag.Vegetarian, Tag.Side]),
                new("E4", "Salt and Pepper Chips", "Chips tossed with chilli, onion, peppers, and five-spice salt.", 4.30m, 4, [Tag.Vegetarian, Tag.Side, Tag.Spicy]),
                new("E5", "Prawn Crackers", "Crisp prawn crackers for sharing.", 2.40m, 5, [Tag.Seafood, Tag.Side]),
                new("E6", "Fortune Cookies", "Wrapped fortune cookies to finish the meal.", 1.80m, 6, [Tag.Vegetarian, Tag.Side])
            ])
    ];

    public async Task SeedAsync(MenuDbContext context)
    {
        var seedCategorySlugs = Categories
            .Select(category => category.Slug)
            .ToArray();

        if (!await context.MenuCategories.AnyAsync(category => seedCategorySlugs.Contains(category.Slug)))
        {
            var legacyCategories = await context.MenuCategories
                .Where(category => LegacySeedCategorySlugs.Contains(category.Slug))
                .ToListAsync();

            context.MenuCategories.RemoveRange(legacyCategories);
            await context.SaveChangesAsync();
        }

        var existingCategorySlugs = await context.MenuCategories
            .Select(category => category.Slug)
            .ToListAsync();

        var existingCategorySlugSet = existingCategorySlugs.ToHashSet(StringComparer.Ordinal);

        foreach (var categorySeed in Categories.Where(categorySeed => !existingCategorySlugSet.Contains(categorySeed.Slug)))
        {
            context.MenuCategories.Add(CreateCategory(categorySeed));
        }

        await context.SaveChangesAsync();
    }

    private static MenuCategory CreateCategory(MenuCategorySeedData categorySeed)
    {
        var category = new MenuCategory(
            slug: categorySeed.Slug,
            displayName: categorySeed.DisplayName,
            description: categorySeed.Description,
            displayOrder: categorySeed.DisplayOrder);

        foreach (var itemSeed in categorySeed.Items)
        {
            category.AddItem(
                slug: itemSeed.Slug,
                name: itemSeed.Name,
                description: itemSeed.Description,
                price: itemSeed.Price,
                available: true,
                displayOrder: itemSeed.DisplayOrder,
                tags: itemSeed.Tags.Select(tag => new MenuItemTag(tag.Value, tag.Color)));
        }

        return category;
    }

    private sealed record MenuCategorySeedData(
        string Slug,
        string DisplayName,
        string Description,
        int DisplayOrder,
        IReadOnlyList<MenuItemSeedData> Items);

    private sealed record MenuItemSeedData(
        string Slug,
        string Name,
        string Description,
        decimal Price,
        int DisplayOrder,
        IReadOnlyList<MenuItemTagSeedData> Tags);

    private sealed record MenuItemTagSeedData(string Value, string Color);

    private static class Tag
    {
        public static readonly MenuItemTagSeedData Classic = new("classic", "#475569");
        public static readonly MenuItemTagSeedData ContainsNuts = new("contains nuts", "#A16207");
        public static readonly MenuItemTagSeedData Duck = new("duck", "#7C3AED");
        public static readonly MenuItemTagSeedData Popular = new("popular", "#F59E0B");
        public static readonly MenuItemTagSeedData Seafood = new("seafood", "#2563EB");
        public static readonly MenuItemTagSeedData Side = new("side", "#64748B");
        public static readonly MenuItemTagSeedData Spicy = new("spicy", "#DC2626");
        public static readonly MenuItemTagSeedData Vegetarian = new("vegetarian", "#16A34A");
    }
}
