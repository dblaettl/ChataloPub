using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChataloWeb.Migrations
{
    public partial class ForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "State",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "CreatedByPersonId",
                table: "Post",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Person",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CreatedByPersonId",
                table: "Discussion",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Post_CreatedByPersonId",
                table: "Post",
                column: "CreatedByPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Post_DiscussionId",
                table: "Post",
                column: "DiscussionId");

            migrationBuilder.CreateIndex(
                name: "IX_Person_AppUserId",
                table: "Person",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Discussion_BoardCategoryId",
                table: "Discussion",
                column: "BoardCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Discussion_CreatedByPersonId",
                table: "Discussion",
                column: "CreatedByPersonId");

            migrationBuilder.CreateIndex(
                name: "IX_BoardCategory_BoardId",
                table: "BoardCategory",
                column: "BoardId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoardCategory_Board_BoardId",
                table: "BoardCategory",
                column: "BoardId",
                principalTable: "Board",
                principalColumn: "BoardId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_BoardCategory_BoardCategoryId",
                table: "Discussion",
                column: "BoardCategoryId",
                principalTable: "BoardCategory",
                principalColumn: "BoardCategoryId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_Person_CreatedByPersonId",
                table: "Discussion",
                column: "CreatedByPersonId",
                principalTable: "Person",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Person_AspNetUsers_AppUserId",
                table: "Person",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Person_CreatedByPersonId",
                table: "Post",
                column: "CreatedByPersonId",
                principalTable: "Person",
                principalColumn: "PersonId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Discussion_DiscussionId",
                table: "Post",
                column: "DiscussionId",
                principalTable: "Discussion",
                principalColumn: "DiscussionId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoardCategory_Board_BoardId",
                table: "BoardCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_BoardCategory_BoardCategoryId",
                table: "Discussion");

            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_Person_CreatedByPersonId",
                table: "Discussion");

            migrationBuilder.DropForeignKey(
                name: "FK_Person_AspNetUsers_AppUserId",
                table: "Person");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_Person_CreatedByPersonId",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_Discussion_DiscussionId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_CreatedByPersonId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Post_DiscussionId",
                table: "Post");

            migrationBuilder.DropIndex(
                name: "IX_Person_AppUserId",
                table: "Person");

            migrationBuilder.DropIndex(
                name: "IX_Discussion_BoardCategoryId",
                table: "Discussion");

            migrationBuilder.DropIndex(
                name: "IX_Discussion_CreatedByPersonId",
                table: "Discussion");

            migrationBuilder.DropIndex(
                name: "IX_BoardCategory_BoardId",
                table: "BoardCategory");

            migrationBuilder.DropColumn(
                name: "CreatedByPersonId",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "CreatedByPersonId",
                table: "Discussion");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Person",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Person",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
