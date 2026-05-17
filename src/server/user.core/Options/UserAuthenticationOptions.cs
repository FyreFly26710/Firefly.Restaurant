namespace Firefly.Restaurant.User.Core.Options;

public sealed class UserAuthenticationOptions
{
    public const string SectionName = "UserAuthentication";

    public List<UserCredentialOptions> Accounts { get; } = [];
}

public sealed class UserCredentialOptions
{
    public string Account { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;
}
