using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateproductstbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_Products_ProductId",
                table: "tbl_filters");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "tbl_Products");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "tbl_filters",
                newName: "ProductVariationId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_filters_ProductId",
                table: "tbl_filters",
                newName: "IX_tbl_filters_ProductVariationId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_ProductVariations_Slug",
                table: "tbl_ProductVariations",
                column: "Slug",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filters_tbl_ProductVariations_ProductVariationId",
                table: "tbl_filters",
                column: "ProductVariationId",
                principalTable: "tbl_ProductVariations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_ProductVariations_ProductVariationId",
                table: "tbl_filters");

            migrationBuilder.DropIndex(
                name: "IX_tbl_ProductVariations_Slug",
                table: "tbl_ProductVariations");

            migrationBuilder.RenameColumn(
                name: "ProductVariationId",
                table: "tbl_filters",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_filters_ProductVariationId",
                table: "tbl_filters",
                newName: "IX_tbl_filters_ProductId");

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "tbl_Products",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filters_tbl_Products_ProductId",
                table: "tbl_filters",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
