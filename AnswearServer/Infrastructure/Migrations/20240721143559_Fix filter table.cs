using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Fixfiltertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_Categories_CategoryId",
                table: "tbl_filters");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "tbl_filters",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_filters_CategoryId",
                table: "tbl_filters",
                newName: "IX_tbl_filters_ProductId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryEntityId",
                table: "tbl_filters",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filters_CategoryEntityId",
                table: "tbl_filters",
                column: "CategoryEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filters_tbl_Categories_CategoryEntityId",
                table: "tbl_filters",
                column: "CategoryEntityId",
                principalTable: "tbl_Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filters_tbl_Products_ProductId",
                table: "tbl_filters",
                column: "ProductId",
                principalTable: "tbl_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_Categories_CategoryEntityId",
                table: "tbl_filters");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_Products_ProductId",
                table: "tbl_filters");

            migrationBuilder.DropIndex(
                name: "IX_tbl_filters_CategoryEntityId",
                table: "tbl_filters");

            migrationBuilder.DropColumn(
                name: "CategoryEntityId",
                table: "tbl_filters");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "tbl_filters",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_filters_ProductId",
                table: "tbl_filters",
                newName: "IX_tbl_filters_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filters_tbl_Categories_CategoryId",
                table: "tbl_filters",
                column: "CategoryId",
                principalTable: "tbl_Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
