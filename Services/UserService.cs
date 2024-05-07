using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WeatherApp.Models; // Adjust the namespace to match your project structure

public interface IUserService
{
    Task<bool> RegisterUserAsync(RegisterDto registerDto);
    Task<User> AuthenticateUserAsync(string username, string password);
    Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
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

        CreatePasswordHash(registerDto.Password, out byte[] passwordHash);

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
            return null; // User not found or password does not match
        }

        // Optional: handle session or token creation here

        return user; // Authentication successful
    }

    public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null || !VerifyPasswordHash(oldPassword, user.PasswordHash))
        {
            return false; // User not found or old password does not match
        }

        CreatePasswordHash(newPassword, out byte[] newPasswordHash);
        user.PasswordHash = newPasswordHash;
        await _context.SaveChangesAsync();
        return true;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPasswordHash(string password, byte[] storedHash)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                    return false;
            }
        }
        return true;
    }
}
