using Firefly.Restaurant.User.Api.Options;
using Firefly.Restaurant.User.Core.Extensions;
using Firefly.Restaurant.User.Core.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(JwtOptions.SectionName));

var userConnectionString = builder.Configuration.GetConnectionString("UserDb");
if (string.IsNullOrWhiteSpace(userConnectionString) && builder.Environment.IsEnvironment("Testing"))
{
    userConnectionString = "Host=localhost;Port=5432;Database=firefly_restaurant_testing;Username=firefly;Password=firefly_dev_password";
}

builder.Services.AddUserCore(
    userConnectionString ?? throw new InvalidOperationException("Connection string 'UserDb' is required."));

if (!builder.Environment.IsEnvironment("Testing"))
{
    builder.Services.AddMigration<UserDbContext, UserDbContextSeed>();
}

var app = builder.Build();

app.UseExceptionHandler();

app.Run();

public partial class Program;
