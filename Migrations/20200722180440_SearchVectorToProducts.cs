using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

namespace postgresearch.Migrations
{
    public partial class SearchVectorToProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Products",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SearchVector",
                table: "Products");
        }
    }
}
