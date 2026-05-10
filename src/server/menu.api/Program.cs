using Firefly.Restaurant.Menu.Api.Apis;
using Firefly.Restaurant.Menu.Core.Extensions;
using Firefly.Restaurant.Menu.Core.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var menuConnectionString = builder.Configuration.GetConnectionString("MenuDb");
if (string.IsNullOrWhiteSpace(menuConnectionString) && builder.Environment.IsEnvironment("Testing"))
{
    menuConnectionString = "Host=localhost;Port=5432;Database=firefly_restaurant_testing;Username=firefly;Password=firefly_dev_password";
}

builder.Services.AddMenuCore(
    menuConnectionString ?? throw new InvalidOperationException("Connection string 'MenuDb' is required."));

if (!builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddMigration<MenuDbContext, MenuDbContextSeed>();
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.MapMenuApi();

app.Run();

public partial class Program;
