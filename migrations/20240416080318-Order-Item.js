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

exports.up = function (db, callback) {
  db.createTable(
    "order_items",
    {
      id: {
        type: "int",
        primaryKey: true,
        unsigned: true,
        autoIncrement: true,
      },
      order_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      product_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      quantity: {
        type: "int",
        unsigned: true,
      },
      unit_price: {
        type: "decimal",
        precision: "10",
        scale: "2",
        notNull: true,
      },
    },
    () => {
      db.addForeignKey(
        "order_items",
        "orders",
        "order_items_orders_fk",
        {
          order_id: "id",
        },
        {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        () => {
          db.addForeignKey(
            "order_items",
            "products",
            "order_items_products_fk",
            {
              product_id: "id",
            },
            {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT",
            },
            callback,
          );
        },
      );
    },
  );
};

exports.down = function (db, callback) {
  db.removeForeignKey("order_items", "order_items_orders_fk", () => {
    db.removeForeignKey("order_items", "order_items_products_fk", () => {
      db.dropTable("order_items", callback);
    });
  });
};

exports._meta = {
  version: 1,
};
