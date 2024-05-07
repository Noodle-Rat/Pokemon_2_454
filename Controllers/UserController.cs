using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WeatherApp.Models;
using WeatherApp.Services;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IUserService _userService;  // Declare the IUserService

    // Modify the constructor to accept IUserService
    public UsersController(ApplicationDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;  // Initialize the IUserService
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (_context.Users.Any(u => u.Username == dto.Username))
        {
            return BadRequest("Username is already taken.");
        }

        CreatePasswordHash(dto.Password, out byte[] passwordHash);

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = passwordHash,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully");
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userService.AuthenticateUserAsync(loginDto.Username, loginDto.Password);
        if (user == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        // Assuming you have a method to handle authentication and setting up cookies or tokens
        // Proceed with setting the authentication session or token
        return Ok("Logged in successfully.");
    }
}

public class RegisterDto
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class LoginDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}
