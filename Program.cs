using Microsoft.AspNetCore.Hosting;
using System.Net.Http;
using WeatherApp.Controllers;
using WeatherApp.Models;
using WeatherApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Register controllers and JSON options
builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

// Register the IHttpClientFactory
builder.Services.AddHttpClient();

// Swagger/OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register your CardsService
builder.Services.AddScoped<CardsService>();

var app = builder.Build();

// Serve static files
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
