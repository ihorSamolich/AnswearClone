using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
namespace Infrastructure.Data;

public class AppDbContext : IdentityDbContext<UserEntity, RoleEntity, int,
   IdentityUserClaim<int>, UserRoleEntity, IdentityUserLogin<int>,
   IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TargetGroupEntity> TargetGroups { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserRoleEntity>(ur =>
        {
            ur.HasKey(ur => new { ur.UserId, ur.RoleId });
            ur.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();
            ur.HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        });

        modelBuilder.Entity<TargetGroupEntity>()
            .HasIndex(u => u.Slug)
            .IsUnique();
    }
}
