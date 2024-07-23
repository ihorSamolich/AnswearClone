using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateproductvariationsandphotostable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Product_Photos_tbl_Products_ProductId",
                table: "tbl_Product_Photos");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "tbl_Product_Photos",
                newName: "ProductVariationId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_Product_Photos_ProductId",
                table: "tbl_Product_Photos",
                newName: "IX_tbl_Product_Photos_ProductVariationId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Product_Photos_tbl_ProductVariations_ProductVariationId",
                table: "tbl_Product_Photos",
                column: "ProductVariationId",
                principalTable: "tbl_ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_Product_Photos_tbl_ProductVariations_ProductVariationId",
                table: "tbl_Product_Photos");

            migrationBuilder.RenameColumn(
                name: "ProductVariationId",
                table: "tbl_Product_Photos",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_Product_Photos_ProductVariationId",
                table: "tbl_Product_Photos",
                newName: "IX_tbl_Product_Photos_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_Product_Photos_tbl_Products_ProductId",
                table: "tbl_Product_Photos",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
