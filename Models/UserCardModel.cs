namespace WeatherApp.Models
{
    public class UserCardModel

    {
        public int UserId { get; set; }
        public string CardId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Card Card { get; set; }
    }
}