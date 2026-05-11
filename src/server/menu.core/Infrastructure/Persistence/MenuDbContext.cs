using Firefly.Restaurant.Menu.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;

public sealed class MenuDbContext(DbContextOptions<MenuDbContext> options) : DbContext(options)
{
    private const string SlugComment = "Editable id displayed in the menu. Can be a number such as \"1\" or a letter-number code such as \"S10\". Must be unique.";

    public DbSet<MenuCategory> MenuCategories => Set<MenuCategory>();

    public DbSet<MenuItem> MenuItems => Set<MenuItem>();

    public DbSet<MenuItemTag> MenuItemTags => Set<MenuItemTag>();

    public DbSet<ShopProfile> ShopProfiles => Set<ShopProfile>();

    public DbSet<ShopOpeningHour> ShopOpeningHours => Set<ShopOpeningHour>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ConfigureMenuCategory(modelBuilder.Entity<MenuCategory>());
        ConfigureMenuItem(modelBuilder.Entity<MenuItem>());
        ConfigureMenuItemTag(modelBuilder.Entity<MenuItemTag>());
        ConfigureShopProfile(modelBuilder.Entity<ShopProfile>());
        ConfigureShopOpeningHour(modelBuilder.Entity<ShopOpeningHour>());
    }

    private static void ConfigureMenuCategory(EntityTypeBuilder<MenuCategory> category)
    {
        category.ToTable("menu_categories");

        category.HasKey(menuCategory => menuCategory.Id);

        category.Property(menuCategory => menuCategory.Id)
            .HasColumnName("id");

        category.Property(menuCategory => menuCategory.Slug)
            .HasColumnName("slug")
            .HasMaxLength(32)
            .HasComment(SlugComment)
            .IsRequired();

        category.HasIndex(menuCategory => menuCategory.Slug)
            .IsUnique();

        category.Property(menuCategory => menuCategory.DisplayName)
            .HasColumnName("display_name")
            .HasMaxLength(120)
            .IsRequired();

        category.Property(menuCategory => menuCategory.Description)
            .HasColumnName("description")
            .HasMaxLength(512)
            .IsRequired();

        category.Property(menuCategory => menuCategory.DisplayOrder)
            .HasColumnName("display_order")
            .IsRequired();

        category.HasMany(menuCategory => menuCategory.Items)
            .WithOne(menuItem => menuItem.Category)
            .HasForeignKey(menuItem => menuItem.CategoryId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        category.Navigation(menuCategory => menuCategory.Items)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }

    private static void ConfigureMenuItem(EntityTypeBuilder<MenuItem> item)
    {
        item.ToTable("menu_items");

        item.HasKey(menuItem => menuItem.Id);

        item.Property(menuItem => menuItem.Id)
            .HasColumnName("id");

        item.Property(menuItem => menuItem.CategoryId)
            .HasColumnName("category_id")
            .IsRequired();

        item.Property(menuItem => menuItem.Slug)
            .HasColumnName("slug")
            .HasMaxLength(32)
            .HasComment(SlugComment)
            .IsRequired();

        item.HasIndex(menuItem => menuItem.Slug)
            .IsUnique();

        item.Property(menuItem => menuItem.Name)
            .HasColumnName("name")
            .HasMaxLength(160)
            .IsRequired();

        item.Property(menuItem => menuItem.Description)
            .HasColumnName("description")
            .HasMaxLength(1024)
            .IsRequired();

        item.Property(menuItem => menuItem.Price)
            .HasColumnName("price")
            .HasPrecision(10, 2)
            .IsRequired();

        item.Property(menuItem => menuItem.Available)
            .HasColumnName("available")
            .IsRequired();

        item.Property(menuItem => menuItem.DisplayOrder)
            .HasColumnName("display_order")
            .IsRequired();

        item.Property(menuItem => menuItem.ImageUrl)
            .HasColumnName("image_url")
            .HasMaxLength(2048);

        item.HasMany(menuItem => menuItem.Tags)
            .WithOne(tag => tag.MenuItem)
            .HasForeignKey(tag => tag.MenuItemId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        item.Navigation(menuItem => menuItem.Tags)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }

    private static void ConfigureMenuItemTag(EntityTypeBuilder<MenuItemTag> tag)
    {
        tag.ToTable("menu_item_tags");

        tag.HasKey(menuItemTag => menuItemTag.Id);

        tag.Property(menuItemTag => menuItemTag.Id)
            .HasColumnName("id");

        tag.Property(menuItemTag => menuItemTag.MenuItemId)
            .HasColumnName("menu_item_id")
            .IsRequired();

        tag.Property(menuItemTag => menuItemTag.Value)
            .HasColumnName("value")
            .HasMaxLength(64)
            .IsRequired();

        tag.Property(menuItemTag => menuItemTag.Color)
            .HasColumnName("color")
            .HasMaxLength(32)
            .IsRequired();

        tag.HasIndex(menuItemTag => new { menuItemTag.MenuItemId, menuItemTag.Value })
            .IsUnique();
    }

    private static void ConfigureShopProfile(EntityTypeBuilder<ShopProfile> profile)
    {
        profile.ToTable("shop_profiles");

        profile.HasKey(shopProfile => shopProfile.Id);

        profile.Property(shopProfile => shopProfile.Id)
            .HasColumnName("id");

        profile.Property(shopProfile => shopProfile.Slug)
            .HasColumnName("slug")
            .HasMaxLength(64)
            .IsRequired();

        profile.HasIndex(shopProfile => shopProfile.Slug)
            .IsUnique();

        profile.Property(shopProfile => shopProfile.DisplayName)
            .HasColumnName("display_name")
            .HasMaxLength(160)
            .IsRequired();

        profile.Property(shopProfile => shopProfile.HomeHeadline)
            .HasColumnName("home_headline")
            .HasMaxLength(160)
            .IsRequired();

        profile.Property(shopProfile => shopProfile.HomeDescription)
            .HasColumnName("home_description")
            .HasMaxLength(1024)
            .IsRequired();

        profile.Property(shopProfile => shopProfile.ContactIntro)
            .HasColumnName("contact_intro")
            .HasMaxLength(512)
            .IsRequired();

        profile.Property(shopProfile => shopProfile.LogoImageUrl)
            .HasColumnName("logo_image_url")
            .HasMaxLength(2048)
            .IsRequired();

        profile.Property(shopProfile => shopProfile.HeroImageUrl)
            .HasColumnName("hero_image_url")
            .HasMaxLength(2048)
            .IsRequired();

        profile.OwnsOne(
            shopProfile => shopProfile.ContactDetails,
            contactDetails =>
            {
                contactDetails.Property(details => details.PhoneNumber)
                    .HasColumnName("contact_phone_number")
                    .HasMaxLength(64)
                    .IsRequired();

                contactDetails.Property(details => details.AddressLine1)
                    .HasColumnName("contact_address_line1")
                    .HasMaxLength(160)
                    .IsRequired();

                contactDetails.Property(details => details.AddressLine2)
                    .HasColumnName("contact_address_line2")
                    .HasMaxLength(160);

                contactDetails.Property(details => details.City)
                    .HasColumnName("contact_city")
                    .HasMaxLength(120)
                    .IsRequired();

                contactDetails.Property(details => details.Region)
                    .HasColumnName("contact_region")
                    .HasMaxLength(120);

                contactDetails.Property(details => details.PostalCode)
                    .HasColumnName("contact_postal_code")
                    .HasMaxLength(32)
                    .IsRequired();

                contactDetails.Property(details => details.Country)
                    .HasColumnName("contact_country")
                    .HasMaxLength(120)
                    .IsRequired();

                contactDetails.Property(details => details.MapUrl)
                    .HasColumnName("contact_map_url")
                    .HasMaxLength(2048);
            });

        profile.Navigation(shopProfile => shopProfile.ContactDetails)
            .IsRequired();

        profile.HasMany(shopProfile => shopProfile.OpeningHours)
            .WithOne(openingHour => openingHour.ShopProfile)
            .HasForeignKey(openingHour => openingHour.ShopProfileId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        profile.Navigation(shopProfile => shopProfile.OpeningHours)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }

    private static void ConfigureShopOpeningHour(EntityTypeBuilder<ShopOpeningHour> openingHour)
    {
        openingHour.ToTable("shop_opening_hours");

        openingHour.HasKey(shopOpeningHour => shopOpeningHour.Id);

        openingHour.Property(shopOpeningHour => shopOpeningHour.Id)
            .HasColumnName("id");

        openingHour.Property(shopOpeningHour => shopOpeningHour.ShopProfileId)
            .HasColumnName("shop_profile_id")
            .IsRequired();

        openingHour.Property(shopOpeningHour => shopOpeningHour.DayOfWeek)
            .HasColumnName("day_of_week")
            .HasConversion<int>()
            .IsRequired();

        openingHour.Property(shopOpeningHour => shopOpeningHour.OpensAt)
            .HasColumnName("opens_at");

        openingHour.Property(shopOpeningHour => shopOpeningHour.ClosesAt)
            .HasColumnName("closes_at");

        openingHour.Property(shopOpeningHour => shopOpeningHour.IsClosed)
            .HasColumnName("is_closed")
            .IsRequired();

        openingHour.Property(shopOpeningHour => shopOpeningHour.Note)
            .HasColumnName("note")
            .HasMaxLength(160);

        openingHour.HasIndex(shopOpeningHour => new { shopOpeningHour.ShopProfileId, shopOpeningHour.DayOfWeek })
            .IsUnique();
    }
}
