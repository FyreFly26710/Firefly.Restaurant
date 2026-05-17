using Firefly.Restaurant.User.Api.Apis;
using Firefly.Restaurant.User.Api.Extensions;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var userConnectionString = builder.Configuration.GetConnectionString("UserDb");
if (string.IsNullOrWhiteSpace(userConnectionString) && builder.Environment.IsEnvironment("Testing"))
{
    userConnectionString = "Host=localhost;Port=5432;Database=firefly_restaurant_testing;Username=firefly;Password=firefly_dev_password";
}

builder.Services.AddUserApi(
    userConnectionString ?? throw new InvalidOperationException("Connection string 'UserDb' is required."));

if (!builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddMigration<UserDbContext, UserDbContextSeed>();
}

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.MapUserAuthApi();

app.Run();

public partial class Program;
