using WeatherApp; 
public static class PasswordHelper
{
    public static byte[] CreatePasswordHash(string password)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    public static bool VerifyPasswordHash(string password, byte[] storedHash)
    {
        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                    return false;
            }
            return true;
        }
    }
}

