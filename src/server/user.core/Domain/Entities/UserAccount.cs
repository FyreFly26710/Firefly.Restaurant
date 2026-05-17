namespace Firefly.Restaurant.User.Core.Domain.Entities;

public sealed class UserAccount
{
    public UserAccount(
        string account,
        string password,
        string role,
        string displayName)
    {
        Account = NormalizeRequired(account, nameof(account));
        Password = NormalizeRequired(password, nameof(password));
        Role = NormalizeRequired(role, nameof(role));
        DisplayName = NormalizeRequired(displayName, nameof(displayName));
    }

    private UserAccount()
    {
    }

    public int Id { get; private set; }

    public string Account { get; private set; } = string.Empty;

    public string Password { get; private set; } = string.Empty;

    public string Role { get; private set; } = string.Empty;

    public string DisplayName { get; private set; } = string.Empty;

    private static string NormalizeRequired(string value, string paramName)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be empty.", paramName);
        }

        return value.Trim();
    }
}
