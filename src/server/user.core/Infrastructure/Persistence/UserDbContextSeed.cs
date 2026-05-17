using Firefly.Restaurant.User.Core.Domain.Consts;
using Firefly.Restaurant.User.Core.Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Firefly.Restaurant.User.Core.Infrastructure.Persistence;

public sealed class UserDbContextSeed : IDbSeeder<UserDbContext>
{
    public async Task SeedAsync(UserDbContext context)
    {
        const string demoAdminAccount = "admin";

        if (await context.UserAccounts.AnyAsync(user => user.Account == demoAdminAccount))
        {
            return;
        }

        context.UserAccounts.Add(new UserAccount(
            account: demoAdminAccount,
            password: "admin",
            role: UserRoles.Admin,
            displayName: "test admin"));

        await context.SaveChangesAsync();
    }
}
