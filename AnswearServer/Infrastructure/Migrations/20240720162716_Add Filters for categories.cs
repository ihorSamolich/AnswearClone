using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddFiltersforcategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_filterNames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_filterNames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_filterNames_tbl_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tbl_Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_filterValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    FilterNameId = table.Column<int>(type: "integer", nullable: false),
                    FilterValueId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_filterValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_filterValues_tbl_filterNames_FilterNameId",
                        column: x => x.FilterNameId,
                        principalTable: "tbl_filterNames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_filterValues_tbl_filterValues_FilterValueId",
                        column: x => x.FilterValueId,
                        principalTable: "tbl_filterValues",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_filters",
                columns: table => new
                {
                    FilterValueId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_filters", x => new { x.FilterValueId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_tbl_filters_tbl_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tbl_Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_filters_tbl_filterValues_FilterValueId",
                        column: x => x.FilterValueId,
                        principalTable: "tbl_filterValues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filterNames_CategoryId",
                table: "tbl_filterNames",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filters_CategoryId",
                table: "tbl_filters",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filterValues_FilterNameId",
                table: "tbl_filterValues",
                column: "FilterNameId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_filterValues_FilterValueId",
                table: "tbl_filterValues",
                column: "FilterValueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_filters");

            migrationBuilder.DropTable(
                name: "tbl_filterValues");

            migrationBuilder.DropTable(
                name: "tbl_filterNames");
        }
    }
}
