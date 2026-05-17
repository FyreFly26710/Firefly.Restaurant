using Firefly.Restaurant.Admin.App.Application.Commands;
using Firefly.Restaurant.Admin.App.Application.Models;
using Firefly.Restaurant.Admin.App.Application.Queries;
using Microsoft.AspNetCore.Components;

namespace Firefly.Restaurant.Admin.App.Components.Pages;

public partial class Home
{
    [Inject]
    private IAdminContentQueryService ContentQuery { get; set; } = null!;

    [Inject]
    private IAdminContentCommandService ContentCommands { get; set; } = null!;

    protected AdminContentDashboard? Dashboard { get; private set; }

    protected ShopProfileForm ShopForm { get; } = new();

    protected Dictionary<string, MenuItemForm> MenuForms { get; } = new(StringComparer.Ordinal);

    protected string? SelectedCategoryId { get; private set; }

    protected string? StatusMessage { get; private set; }

    protected int UnavailableItemCount => Dashboard?.MenuItems.Count(item => !item.Available) ?? 0;

    protected IEnumerable<MenuItemEditorModel> FilteredItems
    {
        get
        {
            if (Dashboard is null)
            {
                return [];
            }

            return string.IsNullOrWhiteSpace(SelectedCategoryId)
                ? Dashboard.MenuItems
                : Dashboard.MenuItems.Where(item => item.CategoryId == SelectedCategoryId);
        }
    }

    protected override async Task OnInitializedAsync()
    {
        Dashboard = await ContentQuery.GetDashboardAsync();
        ResetFormsFromDashboard();
    }

    protected void SelectCategory(string? categoryId)
    {
        SelectedCategoryId = categoryId;
    }

    protected string GetCategoryButtonClass(string? categoryId)
    {
        return string.Equals(SelectedCategoryId, categoryId, StringComparison.Ordinal)
            ? "active"
            : string.Empty;
    }

    protected async Task SaveShopAsync()
    {
        try
        {
            Dashboard = await ContentCommands.UpdateShopProfileAsync(new UpdateShopProfileCommand(
                DisplayName: ShopForm.DisplayName,
                Tagline: ShopForm.Tagline,
                HomeHeadline: ShopForm.HomeHeadline,
                HomeDescription: ShopForm.HomeDescription,
                ContactIntro: ShopForm.ContactIntro,
                PhoneNumber: ShopForm.PhoneNumber,
                AddressLine1: ShopForm.AddressLine1,
                City: ShopForm.City,
                PostalCode: ShopForm.PostalCode));

            ResetFormsFromDashboard();
            StatusMessage = "Shop details saved to the local demo store.";
        }
        catch (Exception exception)
        {
            StatusMessage = exception.Message;
        }
    }

    protected async Task SaveMenuItemAsync(string itemId)
    {
        if (!MenuForms.TryGetValue(itemId, out var form))
        {
            return;
        }

        try
        {
            Dashboard = await ContentCommands.UpdateMenuItemAsync(new UpdateMenuItemCommand(
                Id: itemId,
                CategoryId: form.CategoryId,
                Name: form.Name,
                Description: form.Description,
                Price: form.Price,
                Available: form.Available,
                Tags: form.Tags));

            ResetFormsFromDashboard();
            StatusMessage = $"Saved {form.Name.Trim()} to the local demo store.";
        }
        catch (Exception exception)
        {
            StatusMessage = exception.Message;
        }
    }

    protected async Task ToggleAvailabilityAsync(string itemId, ChangeEventArgs eventArgs)
    {
        if (!MenuForms.TryGetValue(itemId, out var form))
        {
            return;
        }

        var available = eventArgs.Value is bool value && value;
        form.Available = available;

        Dashboard = await ContentCommands.ToggleMenuItemAvailabilityAsync(new ToggleMenuItemAvailabilityCommand(
            Id: itemId,
            Available: available));

        ResetFormsFromDashboard();
        StatusMessage = available ? "Item restored to the demo menu." : "Item hidden from the demo menu.";
    }

    protected void ResetFormsFromDashboard()
    {
        if (Dashboard is null)
        {
            return;
        }

        ShopForm.Load(Dashboard.Shop);
        MenuForms.Clear();
        foreach (var item in Dashboard.MenuItems)
        {
            MenuForms[item.Id] = MenuItemForm.FromModel(item);
        }
    }

    protected sealed class ShopProfileForm
    {
        public string DisplayName { get; set; } = string.Empty;

        public string Tagline { get; set; } = string.Empty;

        public string HomeHeadline { get; set; } = string.Empty;

        public string HomeDescription { get; set; } = string.Empty;

        public string ContactIntro { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string AddressLine1 { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string PostalCode { get; set; } = string.Empty;

        public void Load(ShopProfileEditorModel shop)
        {
            DisplayName = shop.DisplayName;
            Tagline = shop.Tagline;
            HomeHeadline = shop.HomeHeadline;
            HomeDescription = shop.HomeDescription;
            ContactIntro = shop.ContactIntro;
            PhoneNumber = shop.PhoneNumber;
            AddressLine1 = shop.AddressLine1;
            City = shop.City;
            PostalCode = shop.PostalCode;
        }
    }

    protected sealed class MenuItemForm
    {
        public string CategoryId { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public bool Available { get; set; }

        public string Tags { get; set; } = string.Empty;

        public static MenuItemForm FromModel(MenuItemEditorModel item)
        {
            return new MenuItemForm
            {
                CategoryId = item.CategoryId,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Available = item.Available,
                Tags = string.Join(", ", item.Tags)
            };
        }
    }
}
