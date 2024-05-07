namespace WeatherApp.Models
{
    public class DeckCard
    {
        public int DeckId { get; set; }
        public string CardId { get; set; }

        // Navigation properties
        public Deck Deck { get; set; }
        public Card Card { get; set; }
    }
}
