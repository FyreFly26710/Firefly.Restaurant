using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;

namespace Firefly.Restaurant.Gateway.FunctionalTests;

[TestClass]
public sealed class GatewayProxyTests
{
    [TestMethod]
    public async Task GetMenuCategories_ProxiesRequestToConfiguredMenuApi()
    {
        await using var backend = await TestMenuBackend.StartAsync();
        await using var factory = CreateGatewayFactory(backend.Address);
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/menu/categories");
        var payload = await response.Content.ReadFromJsonAsync<IReadOnlyList<BackendMenuCategoryResponse>>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual("menu-api", response.Headers.GetValues("X-Firefly-Test-Backend").Single());
        Assert.IsNotNull(payload);
        Assert.AreEqual("proxied-category", payload.Single().Slug);
    }

    [TestMethod]
    public async Task GetMenuItemBySlug_ProxiesMissingItemResponse()
    {
        await using var backend = await TestMenuBackend.StartAsync();
        await using var factory = CreateGatewayFactory(backend.Address);
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/menu/items/not-on-menu");

        Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        Assert.AreEqual("menu-api", response.Headers.GetValues("X-Firefly-Test-Backend").Single());
    }

    [TestMethod]
    public async Task GetShopProfile_ProxiesRequestToConfiguredMenuApi()
    {
        await using var backend = await TestMenuBackend.StartAsync();
        await using var factory = CreateGatewayFactory(backend.Address);
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/menu/shop");
        var payload = await response.Content.ReadFromJsonAsync<BackendShopProfileResponse>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual("menu-api", response.Headers.GetValues("X-Firefly-Test-Backend").Single());
        Assert.IsNotNull(payload);
        Assert.AreEqual("firefly", payload.Slug);
    }

    [TestMethod]
    public async Task PostUserLogin_ProxiesRequestToConfiguredUserApi()
    {
        await using var menuBackend = await TestMenuBackend.StartAsync();
        await using var userBackend = await TestUserBackend.StartAsync();
        await using var factory = CreateGatewayFactory(menuBackend.Address, userBackend.Address);
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new UserLoginRequest("user", "password"));
        var payload = await response.Content.ReadFromJsonAsync<BackendAuthenticatedUserResponse>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.AreEqual("user-api", response.Headers.GetValues("X-Firefly-Test-Backend").Single());
        Assert.IsNotNull(payload);
        Assert.AreEqual("user", payload.Role);
    }

    private static WebApplicationFactory<Program> CreateGatewayFactory(string menuApiAddress, string? userApiAddress = null)
    {
        return new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureAppConfiguration((_, configuration) =>
                {
                    var settings = new Dictionary<string, string?>
                    {
                        ["ReverseProxy:Routes:menu-api-route:ClusterId"] = "menu-api-cluster",
                        ["ReverseProxy:Routes:menu-api-route:Match:Path"] = "/api/menu/{**catch-all}",
                        ["ReverseProxy:Clusters:menu-api-cluster:Destinations:menu-api:Address"] = menuApiAddress
                    };

                    if (userApiAddress is not null)
                    {
                        settings["ReverseProxy:Routes:user-api-route:ClusterId"] = "user-api-cluster";
                        settings["ReverseProxy:Routes:user-api-route:Match:Path"] = "/api/users/{**catch-all}";
                        settings["ReverseProxy:Clusters:user-api-cluster:Destinations:user-api:Address"] = userApiAddress;
                    }

                    configuration.AddInMemoryCollection(settings);
                });
            });
    }

    private sealed record BackendMenuCategoryResponse(string Slug);

    private sealed record BackendShopProfileResponse(string Slug);

    private sealed record UserLoginRequest(
        string Account,
        string Password);

    private sealed record BackendAuthenticatedUserResponse(
        string Account,
        string Role,
        string DisplayName);

    private sealed class TestMenuBackend : IAsyncDisposable
    {
        private readonly WebApplication app;

        private TestMenuBackend(WebApplication app, string address)
        {
            this.app = app;
            Address = address.EndsWith('/') ? address : $"{address}/";
        }

        public string Address { get; }

        public static async Task<TestMenuBackend> StartAsync()
        {
            var builder = WebApplication.CreateSlimBuilder();
            builder.WebHost.UseUrls("http://127.0.0.1:0");

            var app = builder.Build();

            app.MapGet("/api/menu/categories", (HttpContext context) =>
            {
                context.Response.Headers.Append("X-Firefly-Test-Backend", "menu-api");

                return Results.Ok(new[]
                {
                    new BackendMenuCategoryResponse("proxied-category")
                });
            });

            app.MapGet("/api/menu/items/{slug}", (HttpContext context) =>
            {
                context.Response.Headers.Append("X-Firefly-Test-Backend", "menu-api");

                return Results.NotFound();
            });

            app.MapGet("/api/menu/shop", (HttpContext context) =>
            {
                context.Response.Headers.Append("X-Firefly-Test-Backend", "menu-api");

                return Results.Ok(new BackendShopProfileResponse("firefly"));
            });

            await app.StartAsync();

            return new TestMenuBackend(app, app.Urls.Single());
        }

        public async ValueTask DisposeAsync()
        {
            await app.DisposeAsync();
        }
    }

    private sealed class TestUserBackend : IAsyncDisposable
    {
        private readonly WebApplication app;

        private TestUserBackend(WebApplication app, string address)
        {
            this.app = app;
            Address = address.EndsWith('/') ? address : $"{address}/";
        }

        public string Address { get; }

        public static async Task<TestUserBackend> StartAsync()
        {
            var builder = WebApplication.CreateSlimBuilder();
            builder.WebHost.UseUrls("http://127.0.0.1:0");

            var app = builder.Build();

            app.MapPost("/api/users/login", (HttpContext context) =>
            {
                context.Response.Headers.Append("X-Firefly-Test-Backend", "user-api");

                return Results.Ok(new BackendAuthenticatedUserResponse(
                    Account: "user",
                    Role: "user",
                    DisplayName: "Restaurant User"));
            });

            await app.StartAsync();

            return new TestUserBackend(app, app.Urls.Single());
        }

        public async ValueTask DisposeAsync()
        {
            await app.DisposeAsync();
        }
    }
}
