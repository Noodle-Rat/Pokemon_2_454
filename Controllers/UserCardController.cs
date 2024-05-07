using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WeatherApp.Models; // Ensure your models are correctly referenced

[ApiController]
[Route("api/[controller]")]
public class UserCardsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserCardsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("addCardToUserCollection")]
    public async Task<IActionResult> AddCardToUserCollection([FromBody] UserCardModel userCard)
    {
        if (userCard == null || userCard.UserId == 0 || string.IsNullOrEmpty(userCard.Card.CardId))
        {
            return BadRequest("Invalid card data.");
        }

        // Check if the card details already exist in the database
        var existingCard = await _context.Cards
            .FirstOrDefaultAsync(c => c.CardId == userCard.Card.CardId);
        if (existingCard == null)
        {
            // If not, add the new card details
            _context.Cards.Add(userCard.Card);
            await _context.SaveChangesAsync();
        }

        // Check if the card is already in the user's collection
        var userCardExists = await _context.UserCards
            .AnyAsync(uc => uc.UserId == userCard.UserId && uc.CardId == userCard.Card.CardId);
        if (userCardExists)
        {
            return BadRequest("This card is already in your collection.");
        }

        // Add the card to user's collection
        _context.UserCards.Add(new UserCardModel { UserId = userCard.UserId, CardId = userCard.Card.CardId });
        await _context.SaveChangesAsync();
        return Ok("Card added to your collection!");
    }
}
