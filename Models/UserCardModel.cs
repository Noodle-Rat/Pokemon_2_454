namespace WeatherApp.Models
{
    public class UserCard
    {
        public int UserId { get; set; }
        public string CardId { get; set; }
        public int Quantity { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Card Card { get; set; }
    }
}