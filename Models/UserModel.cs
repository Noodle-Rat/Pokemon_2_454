﻿namespace WeatherApp.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        // Navigation properties
        public List<Deck> Decks { get; set; }
        public List<UserCard> UserCards { get; set; }
    }

}