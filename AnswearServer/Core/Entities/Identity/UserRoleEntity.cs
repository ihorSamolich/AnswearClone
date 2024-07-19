using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class UserRoleEntity : IdentityUserRole<int>
{
    public virtual UserEntity User { get; set; } = null!;

    public virtual RoleEntity Role { get; set; } = null!;
}
