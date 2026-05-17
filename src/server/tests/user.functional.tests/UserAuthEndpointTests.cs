using System.Net;
using System.Net.Http.Json;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Domain.Entities;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Firefly.Restaurant.User.FunctionalTests;

[TestClass]
public sealed class UserAuthEndpointTests
{
    [TestMethod]
    public async Task Login_ReturnsUserRoleForValidUserCredentials()
    {
        await using var factory = CreateFactory();
        await SeedUserAsync(factory, new UserAccount(
            account: "user",
            password: "user-password",
            role: UserRoles.User,
            displayName: "Restaurant User"));
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("user", "user-password"));
        var user = await response.Content.ReadFromJsonAsync<AuthenticatedUserResponse>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.IsNotNull(user);
        Assert.AreEqual("user", user.Account);
        Assert.AreEqual("user", user.Role);
        Assert.AreEqual("Restaurant User", user.DisplayName);
    }

    [TestMethod]
    public async Task Login_ReturnsAdminRoleForValidAdminCredentials()
    {
        await using var factory = CreateFactory();
        await SeedDemoAdminAsync(factory);
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("admin", "admin"));
        var user = await response.Content.ReadFromJsonAsync<AuthenticatedUserResponse>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual("admin", user.Role);
        Assert.AreEqual("test admin", user.DisplayName);
    }

    [TestMethod]
    public async Task Login_ReturnsUnauthorizedForInvalidCredentials()
    {
        await using var factory = CreateFactory();
        await SeedDemoAdminAsync(factory);
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("admin", "wrong-password"));

        Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [TestMethod]
    public async Task Login_ReturnsBadRequestForMissingAccountOrPassword()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("", ""));

        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
    }

    private static WebApplicationFactory<Program> CreateFactory()
    {
        var databaseName = Guid.NewGuid().ToString("N");

        return new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing");
                builder.ConfigureAppConfiguration((_, configuration) =>
                {
                    configuration.AddInMemoryCollection(new Dictionary<string, string?>
                    {
                        ["ConnectionStrings:UserDb"] = "Host=localhost;Port=5432;Database=firefly_restaurant_testing;Username=firefly;Password=firefly_dev_password"
                    });
                });
                builder.ConfigureServices(services =>
                {
                    services.RemoveAll<IDbContextOptionsConfiguration<UserDbContext>>();
                    services.RemoveAll<DbContextOptions<UserDbContext>>();
                    services.AddDbContext<UserDbContext>(options =>
                        options.UseInMemoryDatabase(databaseName));
                });
            });
    }

    private static async Task SeedDemoAdminAsync(WebApplicationFactory<Program> factory)
    {
        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<UserDbContext>();

        await new UserDbContextSeed().SeedAsync(context);
    }

    private static async Task SeedUserAsync(WebApplicationFactory<Program> factory, UserAccount user)
    {
        using var scope = factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<UserDbContext>();

        context.UserAccounts.Add(user);
        await context.SaveChangesAsync();
    }

    private sealed record LoginRequest(
        string Account,
        string Password);

    private sealed record AuthenticatedUserResponse(
        string Account,
        string Role,
        string DisplayName);
}
