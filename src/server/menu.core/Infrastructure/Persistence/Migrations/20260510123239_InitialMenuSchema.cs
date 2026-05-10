using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Firefly.Restaurant.Menu.Core.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialMenuSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "menu_categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    slug = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false, comment: "Editable id displayed in the menu. Can be a number such as \"1\" or a letter-number code such as \"S10\". Must be unique."),
                    display_name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "menu_items",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    category_id = table.Column<int>(type: "integer", nullable: false),
                    slug = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false, comment: "Editable id displayed in the menu. Can be a number such as \"1\" or a letter-number code such as \"S10\". Must be unique."),
                    name = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    description = table.Column<string>(type: "character varying(1024)", maxLength: 1024, nullable: false),
                    price = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    available = table.Column<bool>(type: "boolean", nullable: false),
                    display_order = table.Column<int>(type: "integer", nullable: false),
                    image_url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_menu_items_menu_categories_category_id",
                        column: x => x.category_id,
                        principalTable: "menu_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "menu_item_tags",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    menu_item_id = table.Column<int>(type: "integer", nullable: false),
                    value = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    color = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_item_tags", x => x.id);
                    table.ForeignKey(
                        name: "FK_menu_item_tags_menu_items_menu_item_id",
                        column: x => x.menu_item_id,
                        principalTable: "menu_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "menu_categories",
                columns: new[] { "id", "description", "display_name", "display_order", "slug" },
                values: new object[,]
                {
                    { 1, "Small plates from the kitchen.", "Starters", 1, "S" },
                    { 2, "Larger plates from the hearth.", "Mains", 2, "M" },
                    { 3, "Sweet finishes.", "Desserts", 3, "D" }
                });

            migrationBuilder.InsertData(
                table: "menu_items",
                columns: new[] { "id", "available", "category_id", "description", "display_order", "image_url", "name", "price", "slug" },
                values: new object[,]
                {
                    { 1, true, 1, "Warm sourdough with cultured butter.", 1, null, "Charred Sourdough", 7.50m, "S10" },
                    { 2, true, 2, "Line-caught hake with lemon leaf butter, sea herbs, and crisp potatoes.", 1, "https://images.example.invalid/menu/oak-fired-hake.jpg", "Oak-fired Hake", 24.00m, "M10" },
                    { 3, true, 3, "Dark chocolate tart with malt cream and preserved cherry.", 1, null, "Molten Chocolate Tart", 9.50m, "D10" }
                });

            migrationBuilder.InsertData(
                table: "menu_item_tags",
                columns: new[] { "id", "color", "menu_item_id", "value" },
                values: new object[,]
                {
                    { 1, "#2F855A", 1, "vegetarian" },
                    { 2, "#2563EB", 2, "fish" },
                    { 3, "#2F855A", 3, "vegetarian" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_menu_categories_slug",
                table: "menu_categories",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menu_item_tags_menu_item_id_value",
                table: "menu_item_tags",
                columns: new[] { "menu_item_id", "value" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menu_items_category_id",
                table: "menu_items",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_menu_items_slug",
                table: "menu_items",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menu_item_tags");

            migrationBuilder.DropTable(
                name: "menu_items");

            migrationBuilder.DropTable(
                name: "menu_categories");
        }
    }
}
