using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Services;
using WeatherApp.Models;
using WeatherApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController : ControllerBase
{
    private readonly CardsService _cardsService;

    public CardsController(CardsService cardsService)
    {
        _cardsService = cardsService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchCards([FromQuery] string name, [FromQuery] string type, [FromQuery] string rarity)
    {
        string jsonResult = await _cardsService.SearchCardsAsync(name, type, rarity);
        if (jsonResult != "No cards found.")
        {
            return Content(jsonResult, "application/json");
        }
        else
        {
            return NotFound(jsonResult);
        }
    }
    [HttpGet("searchByName")]
    public async Task<IActionResult> SearchCardsByName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Name parameter is required.");
        }

        string jsonResult = await _cardsService.SearchCardsByNameAsync(name);
        if (jsonResult != "No cards found.")
        {
            return Content(jsonResult, "application/json");
        }
        else
        {
            return NotFound(jsonResult);
        }
    }
}

