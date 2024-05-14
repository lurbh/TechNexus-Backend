'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  // Insert sample data into Products Table
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["iPhone 15", 1, 1, "Latest iPhone model", 1310.50, 100, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715333491/TechNexus/ioo8eyyqhcoks3a1yirs.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["iPhone 15 Pro", 1, 1, "Latest iPhone model Pro Version", 1665.25, 100, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715333770/TechNexus/xyka6mhrkfjwupnxrnwh.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Samsung Galaxy S24", 1, 2, "Samsung flagship smartphone", 1485.99, 120, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715334047/TechNexus/ayawtzelsa1jwygwleei.png"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Samsung Galaxy S24 Ultra", 1, 2, "Samsung flagship smartphone", 2175.99, 120, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715334108/TechNexus/nezqwwltbys9skjo7p5c.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Sony WH-1000XM5", 3, 3, "Noise-canceling headphones", 450.99, 150, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715334502/TechNexus/bksiy98l24q9p4owwhtj.webp"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Xbox Series X", 4, 4, "Next-gen gaming console", 789.99, 70, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715334648/TechNexus/ni2uyfff26is2apttjdt.png"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["MacBook Pro", 2, 1, "Powerful laptop by Apple", 2315.99, 50, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715335179/TechNexus/yjgf1opbqb47u1jaqimf.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Google Pixel 8", 1, 5, "Google's latest flagship smartphone", 1099.99, 80, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715335300/TechNexus/a74ytzetyr2mnsxer73j.png"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Google Pixel 8 Pro", 1, 5, "Google's latest flagship smartphone", 1540.99, 80, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715335255/TechNexus/up9pry1wlgzfjcz1jce9.png"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Sony PlayStation 5", 4, 3, "Next-gen gaming console by Sony", 499.99, 100, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715336068/TechNexus/tt2a7hxqykeuu4dhgl4m.png"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Dell XPS 14", 2, 8, "Ultra-portable laptop by Dell", 2190.99, 60, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715336486/TechNexus/xkwe2xusal3a4rflg1i9.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Bose QuietComfort 45", 3, 9, "Wireless noise-canceling headphones", 499.99, 90, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715336517/TechNexus/omigyw616dtoaq7dpyvs.jpg"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Nintendo Switch OLED", 4, 6, "Hybrid gaming console by Nintendo", 249.99, 120, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715336545/TechNexus/dzrypdamrm68qevqrnfi.webp"]);
  await db.insert("products", ["product_name", "category_id", "brand_id", "description", "price", "quantity_available", "image_url"], ["Titan 18 HX A14V", 2, 7, "Powerful Gaming Laptop From MSI", 2399.99, 50, "https://res.cloudinary.com/dymr3ncda/image/upload/v1715336566/TechNexus/aupnhf5g8b2vd4jriize.png"]);
// Add more products as needed
  
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
