namespace WeatherApp.Models
{
    public class Deck
    {
        public int DeckId { get; set; }
        public int UserId { get; set; }
        public string DeckName { get; set; }

        // Navigation properties
        public User User { get; set; }
        public List<DeckCard> DeckCards { get; set; }
    }
}