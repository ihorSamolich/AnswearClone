using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addproductvariatiotable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Products_tbl_DiscountValues_DiscountValueId",
                table: "tbl_Products");

            migrationBuilder.DropIndex(
                name: "IX_tbl_Products_DiscountValueId",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "DiscountValueId",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "tbl_Products");

            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "tbl_Products");

            migrationBuilder.CreateTable(
                name: "tbl_ProductVariations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Slug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    ShortDescription = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    Color = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    DiscountValueId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_ProductVariations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_ProductVariations_tbl_DiscountValues_DiscountValueId",
                        column: x => x.DiscountValueId,
                        principalTable: "tbl_DiscountValues",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tbl_ProductVariations_tbl_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tbl_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductVariations_DiscountValueId",
                table: "tbl_ProductVariations",
                column: "DiscountValueId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductVariations_ProductId",
                table: "tbl_ProductVariations",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_ProductVariations");

            migrationBuilder.AddColumn<int>(
                name: "DiscountValueId",
                table: "tbl_Products",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "tbl_Products",
                type: "numeric(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "tbl_Products",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Products_DiscountValueId",
                table: "tbl_Products",
                column: "DiscountValueId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Products_tbl_DiscountValues_DiscountValueId",
                table: "tbl_Products",
                column: "DiscountValueId",
                principalTable: "tbl_DiscountValues",
                principalColumn: "Id");
        }
    }
}
