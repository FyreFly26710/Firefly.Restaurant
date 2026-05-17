namespace Firefly.Restaurant.User.Core.Domain.Consts;

public static class UserRoles
{
    public const string User = "user";
    public const string Admin = "admin";

    public static string? Normalize(string? role)
    {
        if (string.Equals(role, User, StringComparison.OrdinalIgnoreCase))
        {
            return User;
        }

        if (string.Equals(role, Admin, StringComparison.OrdinalIgnoreCase))
        {
            return Admin;
        }

        return null;
    }
}
