using Firefly.Restaurant.Gateway.Api.Apis;
using Firefly.Restaurant.Menu.Core.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddMenuCore();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.MapGatewayMenuApi();

app.Run();

public partial class Program;
