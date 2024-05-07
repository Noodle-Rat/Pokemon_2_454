using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Models; // Adjust the namespace to match your project structure

public interface IUserService
{
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
    Task<User> AuthenticateUserAsync(string username, string password);
    
}

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> RegisterUserAsync(RegisterDto registerDto)
    {
        if (_context.Users.Any(u => u.Username == registerDto.Username))
        {
            return false; // Username already taken
        }

        var passwordHash = CreatePasswordHash(registerDto.Password);

        var user = new User
        {
            Username = registerDto.Username,
            PasswordHash = passwordHash,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Email = registerDto.Email
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<User> AuthenticateUserAsync(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
        {
            return null; // Authentication failed
        }
        return user; // Authentication successful
    }

    private byte[] CreatePasswordHash(string password)
    {
        return PasswordHelper.CreatePasswordHash(password);
    }

    private bool VerifyPasswordHash(string password, byte[] storedHash)
    {
        return PasswordHelper.VerifyPasswordHash(password, storedHash);
    }
}
