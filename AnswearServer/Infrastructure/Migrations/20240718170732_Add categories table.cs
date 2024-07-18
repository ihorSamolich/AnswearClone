using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addcategoriestable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Slug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    TargetGroupId = table.Column<int>(type: "integer", nullable: true),
                    ParentId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_Categories_tbl_Categories_ParentId",
                        column: x => x.ParentId,
                        principalTable: "tbl_Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tbl_Categories_tbl_TargetGroup_TargetGroupId",
                        column: x => x.TargetGroupId,
                        principalTable: "tbl_TargetGroup",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Categories_ParentId",
                table: "tbl_Categories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Categories_TargetGroupId",
                table: "tbl_Categories",
                column: "TargetGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_Categories");
        }
    }
}
