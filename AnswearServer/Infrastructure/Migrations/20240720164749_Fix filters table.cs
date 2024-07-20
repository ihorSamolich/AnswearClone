using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Fixfilterstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_filterValues_tbl_filterValues_FilterValueId",
                table: "tbl_filterValues");

            migrationBuilder.DropIndex(
                name: "IX_tbl_filterValues_FilterValueId",
                table: "tbl_filterValues");

            migrationBuilder.DropColumn(
                name: "FilterValueId",
                table: "tbl_filterValues");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FilterValueId",
                table: "tbl_filterValues",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filterValues_FilterValueId",
                table: "tbl_filterValues",
                column: "FilterValueId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_filterValues_tbl_filterValues_FilterValueId",
                table: "tbl_filterValues",
                column: "FilterValueId",
                principalTable: "tbl_filterValues",
                principalColumn: "Id");
        }
    }
}
