using Firefly.Restaurant.User.Core.Application.Queries;
using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Domain.Entities;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.User.UnitTests;

[TestClass]
public sealed class UserAccountQueryTests
{
    [TestMethod]
    public async Task VerifyUserAsync_ReturnsUserForStoredCredentials()
    {
        await using var context = CreateDbContext();
        context.UserAccounts.Add(new UserAccount(
            account: "user",
            password: "user-password",
            role: UserRoles.User,
            displayName: "Restaurant User"));
        await context.SaveChangesAsync();
        var query = new UserAccountQuery(context);

        var user = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: "user",
            Password: "user-password"));

        Assert.IsNotNull(user);
        Assert.AreEqual("user", user.Account);
        Assert.AreEqual(UserRoles.User, user.Role);
        Assert.AreEqual("Restaurant User", user.DisplayName);
    }

    [TestMethod]
    public async Task VerifyUserAsync_ReturnsAdminFromSeededDemoCredentials()
    {
        await using var context = CreateDbContext();
        await new UserDbContextSeed().SeedAsync(context);
        var query = new UserAccountQuery(context);

        var user = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: "admin",
            Password: "admin"));

        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual(UserRoles.Admin, user.Role);
        Assert.AreEqual("test admin", user.DisplayName);
    }

    [TestMethod]
    public async Task VerifyUserAsync_MatchesAccountCaseInsensitively()
    {
        await using var context = CreateDbContext();
        await new UserDbContextSeed().SeedAsync(context);
        var query = new UserAccountQuery(context);

        var user = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: " Admin ",
            Password: "admin"));

        Assert.IsNotNull(user);
        Assert.AreEqual("admin", user.Account);
        Assert.AreEqual(UserRoles.Admin, user.Role);
    }

    [TestMethod]
    public async Task VerifyUserAsync_ReturnsNullForInvalidCredentials()
    {
        await using var context = CreateDbContext();
        await new UserDbContextSeed().SeedAsync(context);
        var query = new UserAccountQuery(context);

        var wrongPassword = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: "admin",
            Password: "wrong-password"));
        var missingAccount = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: "missing",
            Password: "admin"));

        Assert.IsNull(wrongPassword);
        Assert.IsNull(missingAccount);
    }

    [TestMethod]
    public async Task VerifyUserAsync_IgnoresAccountsWithoutKnownRoles()
    {
        await using var context = CreateDbContext();
        context.UserAccounts.Add(new UserAccount(
            account: "operator",
            password: "operator-password",
            role: "operator",
            displayName: "Operator"));
        await context.SaveChangesAsync();
        var query = new UserAccountQuery(context);

        var user = await query.VerifyUserAsync(new VerifyUserQuery(
            Account: "operator",
            Password: "operator-password"));

        Assert.IsNull(user);
    }

    [TestMethod]
    public async Task SeedAsync_AddsDemoAdminOnlyOnce()
    {
        await using var context = CreateDbContext();
        var seeder = new UserDbContextSeed();

        await seeder.SeedAsync(context);
        await seeder.SeedAsync(context);

        var adminUsers = await context.UserAccounts
            .Where(user => user.Account == "admin")
            .ToListAsync();

        Assert.HasCount(1, adminUsers);
        Assert.AreEqual("admin", adminUsers.Single().Password);
        Assert.AreEqual(UserRoles.Admin, adminUsers.Single().Role);
        Assert.AreEqual("test admin", adminUsers.Single().DisplayName);
    }

    private static UserDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<UserDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString("N"))
            .Options;

        return new UserDbContext(options);
    }
}
