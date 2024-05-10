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
  await db.insert("categories", ["category_name", "category_img_url"], ["Smartphones", "https://res.cloudinary.com/dymr3ncda/image/upload/v1713430833/q4w4etp0dfxptxllk1ik.png"]);
  await db.insert("categories", ["category_name", "category_img_url"], ["Laptops", "https://res.cloudinary.com/dymr3ncda/image/upload/v1713430874/amt3nc6mujazt8pwso9d.png"]);
  await db.insert("categories", ["category_name", "category_img_url"], ["Headphones", "https://res.cloudinary.com/dymr3ncda/image/upload/v1713430898/skyhp8yrhdttnkhsnvkh.png"]);
  await db.insert("categories", ["category_name", "category_img_url"], ["Gaming Consoles", "https://res.cloudinary.com/dymr3ncda/image/upload/v1713430920/onrtigq2ezdxr3peh0he.png"]);
  await db.insert("categories", ["category_name", "category_img_url"], ["Personal Computers", "https://res.cloudinary.com/dymr3ncda/image/upload/v1714104532/blmwrbmtd1otdhqud4qc.jpg"]);

  // Insert sample data into Brands Table
  await db.insert("brands", 
  ["brand_name", "country_of_origin"], [
    ["Apple", "USA"],
    ["Samsung", "South Korea"],
    ["Sony", "Japan"],
    ["Microsoft", "USA"],
    ["Google", "USA"],
    ["Nintendo", "Japan"],
    ["MSI", "Taiwan"],
    ["Dell", "USA"],
    ["Bose", "USA"]
  ]);

  

  // Insert sample data into Order_Statuses Table
  await db.insert("order_statuses", ["status_name"], ["Pending"]);
  await db.insert("order_statuses", ["status_name"], ["Processing"]);
  await db.insert("order_statuses", ["status_name"], ["Shipped"]);
  await db.insert("order_statuses", ["status_name"], ["Delivered"]);
  await db.insert("order_statuses", ["status_name"], ["Cancelled"]);
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
