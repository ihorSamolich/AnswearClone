using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class UserEntity : IdentityUser<int>
{
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public virtual ICollection<UserRoleEntity> UserRoles { get; set; } = null!;

}