﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace WeatherApp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WeatherApp.Models.Card", b =>
                {
                    b.Property<string>("CardId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Abilities")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Artist")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Attacks")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EvolvesFrom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EvolvesTo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FlavorText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Hp")
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Legalities")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Level")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rarity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RegulationMark")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Resistances")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RetreatCost")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SetName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SetSeries")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Subtypes")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Supertype")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Types")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Weaknesses")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CardId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("WeatherApp.Models.Deck", b =>
                {
                    b.Property<int>("DeckId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DeckId"));

                    b.Property<string>("DeckName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("DeckId");

                    b.HasIndex("UserId");

                    b.ToTable("Decks");
                });

            modelBuilder.Entity("WeatherApp.Models.DeckCard", b =>
                {
                    b.Property<int>("DeckId")
                        .HasColumnType("int");

                    b.Property<string>("CardId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("DeckId", "CardId");

                    b.HasIndex("CardId");

                    b.ToTable("DeckCards");
                });

            modelBuilder.Entity("WeatherApp.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WeatherApp.Models.UserCard", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("CardId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("UserId", "CardId");

                    b.HasIndex("CardId");

                    b.ToTable("UserCards");
                });

            modelBuilder.Entity("WeatherApp.Models.Deck", b =>
                {
                    b.HasOne("WeatherApp.Models.User", "User")
                        .WithMany("Decks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WeatherApp.Models.DeckCard", b =>
                {
                    b.HasOne("WeatherApp.Models.Card", "Card")
                        .WithMany("DeckCards")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WeatherApp.Models.Deck", "Deck")
                        .WithMany("DeckCards")
                        .HasForeignKey("DeckId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Deck");
                });

            modelBuilder.Entity("WeatherApp.Models.UserCard", b =>
                {
                    b.HasOne("WeatherApp.Models.Card", "Card")
                        .WithMany("UserCards")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WeatherApp.Models.User", "User")
                        .WithMany("UserCards")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WeatherApp.Models.Card", b =>
                {
                    b.Navigation("DeckCards");

                    b.Navigation("UserCards");
                });

            modelBuilder.Entity("WeatherApp.Models.Deck", b =>
                {
                    b.Navigation("DeckCards");
                });

            modelBuilder.Entity("WeatherApp.Models.User", b =>
                {
                    b.Navigation("Decks");

                    b.Navigation("UserCards");
                });
#pragma warning restore 612, 618
        }
    }
}