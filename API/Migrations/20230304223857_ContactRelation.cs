using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ContactRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "userId",
                table: "Contacts",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "userId1",
                table: "Contacts",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_userId1",
                table: "Contacts",
                column: "userId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_AspNetUsers_userId1",
                table: "Contacts",
                column: "userId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_AspNetUsers_userId1",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_userId1",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "userId1",
                table: "Contacts");
        }
    }
}
