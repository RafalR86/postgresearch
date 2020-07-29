using Microsoft.EntityFrameworkCore.Migrations;

namespace Postgresearch.Migrations
{
    public partial class TriggerProductTsVector : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Products_SearchVector",
                table: "Products",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");

            migrationBuilder.Sql(
                @"CREATE TRIGGER product_search_vector_update BEFORE INSERT OR UPDATE
                ON ""Products"" FOR EACH ROW EXECUTE PROCEDURE
                tsvector_update_trigger(""SearchVector"", 'pg_catalog.english', ""Symbol"", ""Name"", ""Description"");");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_SearchVector",
                table: "Products");

            migrationBuilder.Sql(@"DROP TRIGGER IF EXISTS product_search_vector_update ON ""Products"";");
        }
    }
}
