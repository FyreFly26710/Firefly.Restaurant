using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;

namespace Firefly.Restaurant.User.FunctionalTests;

[TestClass]
public sealed class UserAuthEndpointTests
{
    [TestMethod]
    public async Task Login_ReturnsUserRoleForValidUserCredentials()
    {
        await using var factory = CreateFactory();
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
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("admin", "admin-password"));
        var user = await response.Content.ReadFromJsonAsync<AuthenticatedUserResponse>();

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual("admin", user.Role);
        Assert.AreEqual("Restaurant Admin", user.DisplayName);
    }

    [TestMethod]
    public async Task Login_ReturnsUnauthorizedForInvalidCredentials()
    {
        await using var factory = CreateFactory();
        using var client = factory.CreateClient();

        using var response = await client.PostAsJsonAsync(
            "/api/users/login",
            new LoginRequest("user", "wrong-password"));

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
        return new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.UseEnvironment("Testing");
                builder.ConfigureAppConfiguration((_, configuration) =>
                {
                    configuration.AddInMemoryCollection(new Dictionary<string, string?>
                    {
                        ["UserAuthentication:Accounts:0:Account"] = "user",
                        ["UserAuthentication:Accounts:0:Password"] = "user-password",
                        ["UserAuthentication:Accounts:0:Role"] = "user",
                        ["UserAuthentication:Accounts:0:DisplayName"] = "Restaurant User",
                        ["UserAuthentication:Accounts:1:Account"] = "admin",
                        ["UserAuthentication:Accounts:1:Password"] = "admin-password",
                        ["UserAuthentication:Accounts:1:Role"] = "admin",
                        ["UserAuthentication:Accounts:1:DisplayName"] = "Restaurant Admin"
                    });
                });
            });
    }

    private sealed record LoginRequest(
        string Account,
        string Password);

    private sealed record AuthenticatedUserResponse(
        string Account,
        string Role,
        string DisplayName);
}
