using Firefly.Restaurant.User.Core.Application.Authentication;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Infrastructure.Authentication;
using Firefly.Restaurant.User.Core.Options;
using Microsoft.Extensions.Options;

namespace Firefly.Restaurant.User.UnitTests;

[TestClass]
public sealed class UserAuthenticationServiceTests
{
    [TestMethod]
    public async Task AuthenticateAsync_ReturnsUserForConfiguredUserCredentials()
    {
        var service = CreateService();

        var user = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: "user",
            Password: "user-password"));

        Assert.IsNotNull(user);
        Assert.AreEqual("user", user.Account);
        Assert.AreEqual(UserRoles.User, user.Role);
        Assert.AreEqual("Restaurant User", user.DisplayName);
    }

    [TestMethod]
    public async Task AuthenticateAsync_ReturnsAdminForConfiguredAdminCredentials()
    {
        var service = CreateService();

        var user = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: "admin",
            Password: "admin-password"));

        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual(UserRoles.Admin, user.Role);
        Assert.AreEqual("Restaurant Admin", user.DisplayName);
    }

    [TestMethod]
    public async Task AuthenticateAsync_MatchesAccountCaseInsensitively()
    {
        var service = CreateService();

        var user = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: " Admin ",
            Password: "admin-password"));

        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual(UserRoles.Admin, user.Role);
    }

    [TestMethod]
    public async Task AuthenticateAsync_ReturnsNullForInvalidCredentials()
    {
        var service = CreateService();

        var wrongPassword = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: "user",
            Password: "wrong-password"));
        var missingAccount = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: "missing",
            Password: "user-password"));

        Assert.IsNull(wrongPassword);
        Assert.IsNull(missingAccount);
    }

    [TestMethod]
    public async Task AuthenticateAsync_IgnoresAccountsWithoutKnownRoles()
    {
        var options = CreateOptions();
        options.Accounts.Add(new UserCredentialOptions
        {
            Account = "operator",
            Password = "operator-password",
            Role = "operator",
            DisplayName = "Operator"
        });
        var service = new ConfiguredUserAuthenticationService(Options.Create(options));

        var user = await service.AuthenticateAsync(new AuthenticateUserCommand(
            Account: "operator",
            Password: "operator-password"));

        Assert.IsNull(user);
    }

    private static ConfiguredUserAuthenticationService CreateService()
    {
        return new ConfiguredUserAuthenticationService(Options.Create(CreateOptions()));
    }

    private static UserAuthenticationOptions CreateOptions()
    {
        var options = new UserAuthenticationOptions();
        options.Accounts.Add(new UserCredentialOptions
        {
            Account = "user",
            Password = "user-password",
            Role = UserRoles.User,
            DisplayName = "Restaurant User"
        });
        options.Accounts.Add(new UserCredentialOptions
        {
            Account = "admin",
            Password = "admin-password",
            Role = UserRoles.Admin,
            DisplayName = "Restaurant Admin"
        });

        return options;
    }
}
