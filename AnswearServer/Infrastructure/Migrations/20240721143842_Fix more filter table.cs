using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Fixmorefiltertable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filters_tbl_Categories_CategoryEntityId",
                table: "tbl_filters");

            migrationBuilder.DropIndex(
                name: "IX_tbl_filters_CategoryEntityId",
                table: "tbl_filters");

            migrationBuilder.DropColumn(
                name: "CategoryEntityId",
                table: "tbl_filters");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
