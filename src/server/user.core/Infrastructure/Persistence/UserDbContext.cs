using Firefly.Restaurant.User.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Firefly.Restaurant.User.Core.Infrastructure.Persistence;

public sealed class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
{
    public DbSet<UserAccount> UserAccounts => Set<UserAccount>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ConfigureUserAccount(modelBuilder.Entity<UserAccount>());
    }

    private static void ConfigureUserAccount(EntityTypeBuilder<UserAccount> userAccount)
    {
        userAccount.ToTable("user_accounts");

        userAccount.HasKey(account => account.Id);

        userAccount.Property(account => account.Id)
            .HasColumnName("id");

        userAccount.Property(account => account.Account)
            .HasColumnName("account")
            .HasMaxLength(120)
            .IsRequired();

        userAccount.HasIndex(account => account.Account)
            .IsUnique();

        userAccount.Property(account => account.Password)
            .HasColumnName("password")
            .HasMaxLength(512)
            .IsRequired();

        userAccount.Property(account => account.Role)
            .HasColumnName("role")
            .HasMaxLength(32)
            .IsRequired();

        userAccount.Property(account => account.DisplayName)
            .HasColumnName("display_name")
            .HasMaxLength(160)
            .IsRequired();
    }
}
