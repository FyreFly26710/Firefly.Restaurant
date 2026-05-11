using Firefly.Restaurant.Menu.Core.Domain.Entities;
using Firefly.Restaurant.Menu.Core.Domain.ValueObjects;

namespace Firefly.Restaurant.Menu.UnitTests;

[TestClass]
public sealed class ShopProfileTests
{
    [TestMethod]
    public void Constructor_CapturesDisplayDataForHomeAndContactPages()
    {
        var contactDetails = new ShopContactDetails(
            phoneNumber: " 020 7946 0100 ",
            addressLine1: " 10 Firefly Lane ",
            addressLine2: " Riverside ",
            city: " London ",
            region: " Greater London ",
            postalCode: " SE1 1AA ",
            country: " United Kingdom ",
            mapUrl: " https://maps.example.invalid/firefly ");

        var profile = new ShopProfile(
            slug: " firefly ",
            displayName: " Firefly Restaurant ",
            homeHeadline: " Seasonal cooking by the river ",
            homeDescription: " A warm neighborhood restaurant. ",
            contactIntro: " Visit us for dinner. ",
            logoImageUrl: " https://images.example.invalid/logo.png ",
            heroImageUrl: " https://images.example.invalid/hero.jpg ",
            contactDetails: contactDetails);

        Assert.AreEqual("firefly", profile.Slug);
        Assert.AreEqual("Firefly Restaurant", profile.DisplayName);
        Assert.AreEqual("Seasonal cooking by the river", profile.HomeHeadline);
        Assert.AreEqual("A warm neighborhood restaurant.", profile.HomeDescription);
        Assert.AreEqual("Visit us for dinner.", profile.ContactIntro);
        Assert.AreEqual("https://images.example.invalid/logo.png", profile.LogoImageUrl);
        Assert.AreEqual("https://images.example.invalid/hero.jpg", profile.HeroImageUrl);
        Assert.AreEqual("020 7946 0100", profile.ContactDetails.PhoneNumber);
        Assert.AreEqual("10 Firefly Lane", profile.ContactDetails.AddressLine1);
        Assert.AreEqual("Riverside", profile.ContactDetails.AddressLine2);
        Assert.AreEqual("London", profile.ContactDetails.City);
        Assert.AreEqual("Greater London", profile.ContactDetails.Region);
        Assert.AreEqual("SE1 1AA", profile.ContactDetails.PostalCode);
        Assert.AreEqual("United Kingdom", profile.ContactDetails.Country);
        Assert.AreEqual("https://maps.example.invalid/firefly", profile.ContactDetails.MapUrl);
    }

    [TestMethod]
    public void AddOpeningHour_AddsDifferentHoursForDifferentDays()
    {
        var profile = CreateProfile();

        profile.AddOpeningHour(
            dayOfWeek: DayOfWeek.Monday,
            opensAt: new TimeOnly(17, 0),
            closesAt: new TimeOnly(22, 0));

        profile.AddOpeningHour(
            dayOfWeek: DayOfWeek.Tuesday,
            opensAt: new TimeOnly(12, 0),
            closesAt: new TimeOnly(21, 30),
            note: "Lunch service");

        Assert.HasCount(2, profile.OpeningHours);
        Assert.AreEqual(DayOfWeek.Monday, profile.OpeningHours[0].DayOfWeek);
        Assert.AreEqual(new TimeOnly(17, 0), profile.OpeningHours[0].OpensAt);
        Assert.AreEqual(new TimeOnly(22, 0), profile.OpeningHours[0].ClosesAt);
        Assert.AreEqual(DayOfWeek.Tuesday, profile.OpeningHours[1].DayOfWeek);
        Assert.AreEqual(new TimeOnly(12, 0), profile.OpeningHours[1].OpensAt);
        Assert.AreEqual(new TimeOnly(21, 30), profile.OpeningHours[1].ClosesAt);
        Assert.AreEqual("Lunch service", profile.OpeningHours[1].Note);
    }

    [TestMethod]
    public void AddOpeningHour_ReplacesExistingDay()
    {
        var profile = CreateProfile();

        profile.AddOpeningHour(
            dayOfWeek: DayOfWeek.Friday,
            opensAt: new TimeOnly(12, 0),
            closesAt: new TimeOnly(22, 0));

        profile.AddOpeningHour(
            dayOfWeek: DayOfWeek.Friday,
            opensAt: new TimeOnly(16, 0),
            closesAt: new TimeOnly(23, 0),
            note: "Dinner only");

        Assert.HasCount(1, profile.OpeningHours);
        Assert.AreEqual(DayOfWeek.Friday, profile.OpeningHours.Single().DayOfWeek);
        Assert.AreEqual(new TimeOnly(16, 0), profile.OpeningHours.Single().OpensAt);
        Assert.AreEqual(new TimeOnly(23, 0), profile.OpeningHours.Single().ClosesAt);
        Assert.AreEqual("Dinner only", profile.OpeningHours.Single().Note);
    }

    [TestMethod]
    public void AddClosedDay_AddsDayWithoutHours()
    {
        var profile = CreateProfile();

        profile.AddClosedDay(DayOfWeek.Sunday, " Private events ");

        var openingHour = profile.OpeningHours.Single();

        Assert.AreEqual(DayOfWeek.Sunday, openingHour.DayOfWeek);
        Assert.IsTrue(openingHour.IsClosed);
        Assert.IsNull(openingHour.OpensAt);
        Assert.IsNull(openingHour.ClosesAt);
        Assert.AreEqual("Private events", openingHour.Note);
    }

    [TestMethod]
    public void Constructor_RejectsBlankLogoImageUrl()
    {
        Assert.ThrowsExactly<ArgumentException>(() =>
            new ShopProfile(
                slug: "firefly",
                displayName: "Firefly Restaurant",
                homeHeadline: "Seasonal cooking",
                homeDescription: "A warm neighborhood restaurant.",
                contactIntro: "Visit us.",
                logoImageUrl: " ",
                heroImageUrl: "https://images.example.invalid/hero.jpg",
                contactDetails: CreateContactDetails()));
    }

    [TestMethod]
    public void AddOpeningHour_RejectsClosingBeforeOpening()
    {
        var profile = CreateProfile();

        Assert.ThrowsExactly<ArgumentException>(() =>
            profile.AddOpeningHour(
                dayOfWeek: DayOfWeek.Monday,
                opensAt: new TimeOnly(22, 0),
                closesAt: new TimeOnly(17, 0)));
    }

    private static ShopProfile CreateProfile()
    {
        return new ShopProfile(
            slug: "firefly",
            displayName: "Firefly Restaurant",
            homeHeadline: "Seasonal cooking",
            homeDescription: "A warm neighborhood restaurant.",
            contactIntro: "Visit us.",
            logoImageUrl: "https://images.example.invalid/logo.png",
            heroImageUrl: "https://images.example.invalid/hero.jpg",
            contactDetails: CreateContactDetails());
    }

    private static ShopContactDetails CreateContactDetails()
    {
        return new ShopContactDetails(
            phoneNumber: "020 7946 0100",
            addressLine1: "10 Firefly Lane",
            addressLine2: null,
            city: "London",
            region: null,
            postalCode: "SE1 1AA",
            country: "United Kingdom",
            mapUrl: "https://maps.example.invalid/firefly");
    }
}
