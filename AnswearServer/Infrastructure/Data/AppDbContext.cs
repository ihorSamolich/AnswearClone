using Core.Entities;
using Core.Entities.Discount;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TargetGroupEntity> TargetGroups { get; set; }

    public DbSet<CategoryEntity> Categories { get; set; }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductPhotoEntity> ProductPhotos { get; set; }

    public DbSet<Discount> Discounts { get; set; }
    public DbSet<DiscountValue> DiscountValues { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TargetGroupEntity>()
            .HasIndex(u => u.Slug)
            .IsUnique();

        modelBuilder.Entity<ProductPhotoEntity>()
            .HasOne(p => p.Product)
            .WithMany(p => p.Photos)
            .HasForeignKey(p => p.ProductId);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany()
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<Product>()
                .HasOne(p => p.DiscountValue)
                .WithMany()
                .HasForeignKey(p => p.DiscountValueId);
    }
}
