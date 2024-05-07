using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using WeatherApp.Models; 

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Card> Cards { get; set; }
    public DbSet<Deck> Decks { get; set; }
    public DbSet<UserCard> UserCards { get; set; }
    public DbSet<DeckCard> DeckCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User
        modelBuilder.Entity<User>()
            .HasMany(u => u.Decks)
            .WithOne(d => d.User)
            .HasForeignKey(d => d.UserId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.UserCards)
            .WithOne(uc => uc.User)
            .HasForeignKey(uc => uc.UserId);

        // Card
        modelBuilder.Entity<Card>()
            .HasMany(c => c.DeckCards)
            .WithOne(dc => dc.Card)
            .HasForeignKey(dc => dc.CardId);

        modelBuilder.Entity<Card>()
            .HasMany(c => c.UserCards)
            .WithOne(uc => uc.Card)
            .HasForeignKey(uc => uc.CardId);

        // Deck
        modelBuilder.Entity<Deck>()
            .HasMany(d => d.DeckCards)
            .WithOne(dc => dc.Deck)
            .HasForeignKey(dc => dc.DeckId);

        // UserCard (Composite Key)
        modelBuilder.Entity<UserCard>()
            .HasKey(uc => new { uc.UserId, uc.CardId });

        // DeckCard (Composite Key)
        modelBuilder.Entity<DeckCard>()
            .HasKey(dc => new { dc.DeckId, dc.CardId });
    }
}