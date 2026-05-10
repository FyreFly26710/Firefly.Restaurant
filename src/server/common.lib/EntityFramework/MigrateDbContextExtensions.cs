using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Microsoft.AspNetCore.Hosting;

public static class MigrateDbContextExtensions
{
    private static readonly string ActivitySourceName = "Firefly.Restaurant.DbMigrations";
    private static readonly ActivitySource ActivitySource = new(ActivitySourceName);

    public static IServiceCollection AddMigration<TContext>(this IServiceCollection services)
        where TContext : DbContext
    {
        return services.AddMigration<TContext>((_, _) => Task.CompletedTask);
    }

    public static IServiceCollection AddMigration<TContext>(
        this IServiceCollection services,
        Func<TContext, IServiceProvider, Task> seeder)
        where TContext : DbContext
    {
        return services.AddHostedService(serviceProvider =>
            new MigrationHostedService<TContext>(serviceProvider, seeder));
    }

    public static IServiceCollection AddMigration<TContext, TDbSeeder>(this IServiceCollection services)
        where TContext : DbContext
        where TDbSeeder : class, IDbSeeder<TContext>
    {
        services.AddScoped<IDbSeeder<TContext>, TDbSeeder>();

        return services.AddMigration<TContext>((context, serviceProvider) =>
            serviceProvider.GetRequiredService<IDbSeeder<TContext>>().SeedAsync(context));
    }

    private static async Task MigrateDbContextAsync<TContext>(
        this IServiceProvider services,
        Func<TContext, IServiceProvider, Task> seeder)
        where TContext : DbContext
    {
        await using var scope = services.CreateAsyncScope();
        var scopeServices = scope.ServiceProvider;
        var logger = scopeServices.GetRequiredService<ILogger<TContext>>();
        var context = scopeServices.GetRequiredService<TContext>();

        using var activity = ActivitySource.StartActivity($"Migrate {typeof(TContext).Name}");

        try
        {
            logger.LogInformation("Migrating database for context {DbContextName}", typeof(TContext).Name);
            var strategy = context.Database.CreateExecutionStrategy();

            await strategy.ExecuteAsync(async () =>
            {
                await context.Database.MigrateAsync();

                var databaseCreator = context.GetService<IRelationalDatabaseCreator>();
                if (!await databaseCreator.HasTablesAsync())
                {
                    logger.LogWarning(
                        "No tables were found after migrations for context {DbContextName}. Creating tables from the current model.",
                        typeof(TContext).Name);

                    await databaseCreator.CreateTablesAsync();
                }

                await seeder(context, scopeServices);
            });
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Database migration failed for context {DbContextName}", typeof(TContext).Name);
            throw;
        }
    }

    private sealed class MigrationHostedService<TContext>(
        IServiceProvider services,
        Func<TContext, IServiceProvider, Task> seeder) : BackgroundService
        where TContext : DbContext
    {
        public override Task StartAsync(CancellationToken cancellationToken)
        {
            return services.MigrateDbContextAsync(seeder);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            return Task.CompletedTask;
        }
    }
}

public interface IDbSeeder<in TContext>
    where TContext : DbContext
{
    Task SeedAsync(TContext context);
}
