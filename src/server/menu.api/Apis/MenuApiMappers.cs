using Firefly.Restaurant.Menu.Api.Contracts.Responses;
using Firefly.Restaurant.Menu.Core.Application.Queries;

namespace Firefly.Restaurant.Menu.Api.Apis;

internal static class MenuApiMappers
{
    public static MenuCategoryResponse ToResponse(this MenuCategoryReadModel category)
    {
        return new MenuCategoryResponse(
            Id: category.Id,
            Slug: category.Slug,
            DisplayName: category.DisplayName,
            Description: category.Description,
            DisplayOrder: category.DisplayOrder,
            Items: category.Items
                .Select(item => item.ToResponse())
                .ToList());
    }

    public static MenuItemResponse ToResponse(this MenuItemReadModel item)
    {
        return new MenuItemResponse(
            Id: item.Id,
            Slug: item.Slug,
            Name: item.Name,
            Description: item.Description,
            Price: item.Price,
            Available: item.Available,
            DisplayOrder: item.DisplayOrder,
            ImageUrl: item.ImageUrl,
            Tags: item.Tags
                .Select(tag => tag.ToResponse())
                .ToList());
    }

    public static ShopProfileResponse ToResponse(this ShopProfileReadModel profile)
    {
        return new ShopProfileResponse(
            Id: profile.Id,
            Slug: profile.Slug,
            DisplayName: profile.DisplayName,
            HomeHeadline: profile.HomeHeadline,
            HomeDescription: profile.HomeDescription,
            ContactIntro: profile.ContactIntro,
            LogoImageUrl: profile.LogoImageUrl,
            HeroImageUrl: profile.HeroImageUrl,
            ContactDetails: new ShopContactDetailsResponse(
                PhoneNumber: profile.ContactDetails.PhoneNumber,
                AddressLine1: profile.ContactDetails.AddressLine1,
                AddressLine2: profile.ContactDetails.AddressLine2,
                City: profile.ContactDetails.City,
                Region: profile.ContactDetails.Region,
                PostalCode: profile.ContactDetails.PostalCode,
                Country: profile.ContactDetails.Country,
                MapUrl: profile.ContactDetails.MapUrl),
            OpeningHours: profile.OpeningHours
                .Select(openingHour => openingHour.ToResponse())
                .ToList());
    }

    private static ItemTagResponse ToResponse(this MenuItemTagReadModel tag)
    {
        return new ItemTagResponse(
            Id: tag.Id,
            Value: tag.Value,
            Color: tag.Color);
    }

    private static ShopOpeningHourResponse ToResponse(this ShopOpeningHourReadModel openingHour)
    {
        return new ShopOpeningHourResponse(
            Id: openingHour.Id,
            DayOfWeek: openingHour.DayOfWeek.ToString(),
            OpensAt: openingHour.OpensAt,
            ClosesAt: openingHour.ClosesAt,
            IsClosed: openingHour.IsClosed,
            Note: openingHour.Note);
    }
}
