using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace WeatherApp.Services
{
    public class CardsService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey = "bc2a8f03-c772-4ffa-b663-d1648c41abc0";  // Hardcoded API key

        public CardsService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> SearchCardsAsync(string name, string type, string rarity)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.pokemontcg.io/v2/");
            client.DefaultRequestHeaders.Add("X-Api-Key", _apiKey);

            string queryString = "cards?q=";
            bool hasPreviousParam = false;

            if (!string.IsNullOrEmpty(name))
            {
                queryString += $"name:{name}*";
                hasPreviousParam = true;
            }

            if (!string.IsNullOrEmpty(type))
            {
                if (hasPreviousParam) queryString += " ";
                queryString += $"types:{type}";
                hasPreviousParam = true;
            }

            if (!string.IsNullOrEmpty(rarity))
            {
                if (hasPreviousParam) queryString += " ";
                queryString += $"rarity:{rarity}";
            }

            var response = await client.GetAsync(queryString);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return content;  // Return the raw JSON content
            }
            else
            {
                return "No cards found."; // Return a simple message if no cards are found or an error occurs
            }
        }
        public async Task<string> SearchCardsByNameAsync(string name)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.pokemontcg.io/v2/");
            client.DefaultRequestHeaders.Add("X-Api-Key", _apiKey);

            string queryString = $"cards?q=name:{name}*"; // Search query by name

            var response = await client.GetAsync(queryString);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();  // Return the raw JSON content
            }
            else
            {
                return "No cards found."; // Return a simple message if no cards are found or an error occurs
            }
        }
    }
}
