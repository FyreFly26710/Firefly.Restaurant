using Firefly.Restaurant.User.Api.Apis;
using Firefly.Restaurant.User.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();
builder.Services.AddUserApi(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseExceptionHandler();

app.MapUserAuthApi();

app.Run();

public partial class Program;
