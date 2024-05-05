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
    "categories",
    {
      id: {
        type: "int",
        primaryKey: true,
        unsigned: true,
        autoIncrement: true,
      },
      category_name: { type: "string", length: 100, notNull: true },
      parent_category_id: { type: "int", unsigned: true },
      category_img_url: { type: "string", length: 255 },
    },
    () => {
      db.addForeignKey(
        "categories",
        "categories",
        "Categories_parent_category_id_foreign",
        {
          parent_category_id: "id",
        },
        {
          onDelete: "RESTRICT",
          onUpdate: "RESTRICT",
        },
        callback,
      );
    },
  );
};

exports.down = function (db, callback) {
  db.removeForeignKey(
    "categories",
    "Categories_parent_category_id_foreign",
    () => {
      db.dropTable("categories", callback);
    },
  );
};

exports._meta = {
  version: 1,
};
