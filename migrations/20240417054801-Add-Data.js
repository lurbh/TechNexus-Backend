"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  // Insert sample data into Roles Table
  await db.insert("roles", ["role_name"], ["admin"]);
  await db.insert("roles", ["role_name"], ["user"]);
  await db.insert("roles", ["role_name"], ["seller"]);

  // Insert sample data into Categories Table
  await db.insert("categories", ["category_name"], ["Smartphones"]);
  await db.insert("categories", ["category_name"], ["Laptops"]);
  await db.insert("categories", ["category_name"], ["Headphones"]);
  await db.insert("categories", ["category_name"], ["Gaming Consoles"]);

  // Insert sample data into Brands Table
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["Apple", "USA"],
  );
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["Samsung", "South Korea"],
  );
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["Sony", "Japan"],
  );
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["Microsoft", "USA"],
  );
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["Nintendo", "Japan"],
  );
  await db.insert(
    "brands",
    ["brand_name", "country_of_origin"],
    ["MSI", "Taiwan"],
  );

  // Insert sample data into Products Table
  await db.insert(
    "products",
    [
      "product_name",
      "category_id",
      "brand_id",
      "description",
      "price",
      "quantity_available",
    ],
    ["iPhone 12", 1, 1, "Latest iPhone model", 999.99, 100],
  );
  await db.insert(
    "products",
    [
      "product_name",
      "category_id",
      "brand_id",
      "description",
      "price",
      "quantity_available",
    ],
    ["Galaxy S21", 1, 2, "Samsung flagship smartphone", 899.99, 120],
  );
  await db.insert(
    "products",
    [
      "product_name",
      "category_id",
      "brand_id",
      "description",
      "price",
      "quantity_available",
    ],
    ["Sony WH-1000XM4", 3, 3, "Noise-canceling headphones", 349.99, 150],
  );
  await db.insert(
    "products",
    [
      "product_name",
      "category_id",
      "brand_id",
      "description",
      "price",
      "quantity_available",
    ],
    ["Xbox Series X", 4, 4, "Next-gen gaming console", 499.99, 70],
  );

  // Insert sample data into Order_Statuses Table
  await db.insert("order_statuses", ["status_name"], ["pending"]);
  await db.insert("order_statuses", ["status_name"], ["processing"]);
  await db.insert("order_statuses", ["status_name"], ["shipped"]);
  await db.insert("order_statuses", ["status_name"], ["delivered"]);
  await db.insert("order_statuses", ["status_name"], ["cancelled"]);
};

exports.down = async function (db) {
  // Drop all the tables
  await db.runSql("DELETE FROM comments");
  await db.runSql("DELETE FROM news_articles");
  await db.runSql("DELETE FROM order_items");
  await db.runSql("DELETE FROM orders");
  await db.runSql("DELETE FROM order_statuses");
  await db.runSql("DELETE FROM reviews");
  await db.runSql("DELETE FROM products");
  await db.runSql("DELETE FROM brands");
  await db.runSql("DELETE FROM categories");
  await db.runSql("DELETE FROM users");
  await db.runSql("DELETE FROM roles");
};

exports._meta = {
  version: 1,
};
