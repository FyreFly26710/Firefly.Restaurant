using Firefly.Restaurant.Menu.Api.Apis;
using Firefly.Restaurant.Menu.Core.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddMenuCore(
    builder.Configuration.GetConnectionString("MenuDb")
        ?? throw new InvalidOperationException("Connection string 'MenuDb' is required."));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.MapMenuApi();

app.Run();

public partial class Program;
