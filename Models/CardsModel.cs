using System.Collections.Generic;
using System.Text.Json;
using WeatherApp;

namespace WeatherApp.Models;

public class Card {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Supertype { get; set; }
    public List<string> Subtypes { get; set; }
    public string Level { get; set; }
    public int Hp { get; set; }
    public List<string> Types { get; set; }
    public string EvolvesFrom { get; set; }
    public List<Attack> Attacks { get; set; }
    public List<string> RetreatCost { get; set; }
    public int ConvertedRetreatCost { get; set; }
    public Set Set { get; set; }
    public string Number { get; set; }
    public string Artist { get; set; }
    public string Rarity { get; set; }
    public List<int> NationalPokedexNumbers { get; set; }
    public Legalities Legalities { get; set; }
    public List<string> EvolvesTo { get; set; }
    public string FlavorText { get; set; }
    public List<string> Rules { get; set; }
    public string RegulationMark { get; set; }
}

    public class Attack
    {
        public List<string> Cost { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public string Damage { get; set; }
        public int ConvertedEnergyCost { get; set; }
    }

    public class Set
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Series { get; set; }
        public int PrintedTotal { get; set; }
        public int Total { get; set; }
        public string Legalities { get; set; }
        public Images SetImages { get; set; }
    }

    public class Images
    {
        public string Small { get; set; }
        public string Large { get; set; }
    }

    public class Legalities
    {
        public string Unlimited { get; set; }
        public string Standard { get; set; }
        public string Expanded { get; set; }
    }
