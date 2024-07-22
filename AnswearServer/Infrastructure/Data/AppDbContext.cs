using Core.Entities;
using Core.Entities.Discount;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Filters;
namespace Infrastructure.Data;

public class AppDbContext : IdentityDbContext<UserEntity, RoleEntity, int,
   IdentityUserClaim<int>, UserRoleEntity, IdentityUserLogin<int>,
   IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TargetGroupEntity> TargetGroups { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }

    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<ProductVariationEntity> ProductVariations { get; set; }

    public DbSet<ProductPhotoEntity> ProductPhotos { get; set; }

    public DbSet<DiscountEntity> Discounts { get; set; }
    public DbSet<DiscountValueEntity> DiscountValues { get; set; }

    public DbSet<FilterNameEntity> FilterNames { get; set; }
    public DbSet<FilterValueEntity> FilterValues { get; set; }
    public DbSet<FilterEntity> Filters { get; set; }
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

        modelBuilder.Entity<ProductVariationEntity>()
         .HasIndex(u => u.Slug)
         .IsUnique();


        //modelBuilder.Entity<ProductPhotoEntity>()
        //    .HasOne(p => p.Product)
        //    .WithMany(p => p.Photos)
        //    .HasForeignKey(p => p.ProductId);

        //modelBuilder.Entity<Product>()
        //    .HasOne(p => p.Category)
        //    .WithMany()
        //    .HasForeignKey(p => p.CategoryId);

        //modelBuilder.Entity<Product>()
        //        .HasOne(p => p.DiscountValue)
        //        .WithMany()
        //        .HasForeignKey(p => p.DiscountValueId);

        modelBuilder.Entity<FilterEntity>(f =>
        {
            f.HasKey(vp => new { vp.FilterValueId, vp.ProductVariationId });
        });
    }
}
