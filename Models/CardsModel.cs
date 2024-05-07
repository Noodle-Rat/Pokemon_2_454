namespace WeatherApp.Models
{
    public class Card
    {
        public string CardId { get; set; }
        public string Name { get; set; }
        public string Supertype { get; set; }
        public string Subtypes { get; set; } // Stored as a comma-separated string
        public string Level { get; set; }
        public int Hp { get; set; }
        public string Types { get; set; } // Stored as a comma-separated string
        public string EvolvesFrom { get; set; }
        public string EvolvesTo { get; set; } // Stored as a comma-separated string
        public string Abilities { get; set; } // JSON or other serialization format
        public string Attacks { get; set; } // JSON or other serialization format
        public string Weaknesses { get; set; }
        public string Resistances { get; set; }
        public string RetreatCost { get; set; }
        public string SetName { get; set; }
        public string SetSeries { get; set; }
        public string Number { get; set; }
        public string Artist { get; set; }
        public string Rarity { get; set; }
        public string FlavorText { get; set; }
        public string Legalities { get; set; }
        public string RegulationMark { get; set; }
        public string ImageUrl { get; set; }

        // Navigation properties
        public List<DeckCard> DeckCards { get; set; }
        public List<UserCardModel> UserCards { get; set; }
    }
} 