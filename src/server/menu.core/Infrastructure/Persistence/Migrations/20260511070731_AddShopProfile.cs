using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddShopProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "shop_profiles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    slug = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    display_name = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    home_headline = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    home_description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    contact_intro = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    logo_image_url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: false),
                    hero_image_url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: false),
                    contact_phone_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    contact_address_line1 = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    contact_address_line2 = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    contact_city = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    contact_region = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    contact_postal_code = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    contact_country = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    contact_map_url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shop_profiles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "shop_opening_hours",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    shop_profile_id = table.Column<int>(type: "integer", nullable: false),
                    day_of_week = table.Column<int>(type: "integer", nullable: false),
                    opens_at = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    closes_at = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    is_closed = table.Column<bool>(type: "boolean", nullable: false),
                    note = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shop_opening_hours", x => x.id);
                    table.ForeignKey(
                        name: "FK_shop_opening_hours_shop_profiles_shop_profile_id",
                        column: x => x.shop_profile_id,
                        principalTable: "shop_profiles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_shop_opening_hours_shop_profile_id_day_of_week",
                table: "shop_opening_hours",
                columns: new[] { "shop_profile_id", "day_of_week" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_shop_profiles_slug",
                table: "shop_profiles",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "shop_opening_hours");

            migrationBuilder.DropTable(
                name: "shop_profiles");
        }
    }
}
