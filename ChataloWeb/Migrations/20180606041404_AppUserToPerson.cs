using Microsoft.EntityFrameworkCore.Migrations;

namespace ChataloWeb.Migrations
{
    public partial class AppUserToPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Person_AppUserId",
                table: "Person");

            migrationBuilder.CreateIndex(
                name: "IX_Person_AppUserId",
                table: "Person",
                column: "AppUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Person_AppUserId",
                table: "Person");

            migrationBuilder.CreateIndex(
                name: "IX_Person_AppUserId",
                table: "Person",
                column: "AppUserId");
        }
    }
}
