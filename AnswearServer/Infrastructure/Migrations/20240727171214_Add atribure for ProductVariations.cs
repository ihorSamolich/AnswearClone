using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddatribureforProductVariations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductVariations_tbl_DiscountValues_DiscountValueId",
                table: "tbl_ProductVariations");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductVariations_tbl_DiscountValues_DiscountValueId",
                table: "tbl_ProductVariations",
                column: "DiscountValueId",
                principalTable: "tbl_DiscountValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_ProductVariations_tbl_DiscountValues_DiscountValueId",
                table: "tbl_ProductVariations");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_ProductVariations_tbl_DiscountValues_DiscountValueId",
                table: "tbl_ProductVariations",
                column: "DiscountValueId",
                principalTable: "tbl_DiscountValues",
                principalColumn: "Id");
        }
    }
}
