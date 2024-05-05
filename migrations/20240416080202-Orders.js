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
    "orders",
    {
      id: {
        type: "int",
        primaryKey: true,
        unsigned: true,
        autoIncrement: true,
      },
      user_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      order_date: {
        type: "datetime",
        defaultValue: "CURRENT_TIMESTAMP",
      },
      order_status_id: {
        type: "int",
        unsigned: true,
      },
    },
    () => {
      db.addForeignKey(
        "orders",
        "users",
        "orders_users_fk",
        {
          User_id: "id",
        },
        {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        () => {
          db.addForeignKey(
            "orders",
            "order_statuses",
            "orders_order_status_fk",
            {
              Order_Status_id: "id",
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
  db.removeForeignKey("orders", "orders_users_fk", () => {
    db.removeForeignKey("orders", "orders_order_status_fk", () => {
      db.dropTable("orders", callback);
    });
  });
};

exports._meta = {
  version: 1,
};
