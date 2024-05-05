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
    "news_articles",
    {
      id: {
        type: "int",
        primaryKey: true,
        unsigned: true,
        autoIncrement: true,
      },
      title: {
        type: "string",
        length: 255,
        notNull: true,
      },
      content: {
        type: "text",
      },
      publication_date: {
        type: "datetime",
        defaultValue: "CURRENT_TIMESTAMP",
      },
      user_id: {
        type: "int",
        unsigned: true,
      },
    },
    () => {
      db.addForeignKey(
        "news_articles",
        "users",
        "news_articles_users_fk",
        {
          user_id: "id",
        },
        {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        callback,
      );
    },
  );
};

exports.down = function (db, callback) {
  db.removeForeignKey("news_articles", "news_articles_users_fk", () => {
    db.dropTable("news_articles", callback);
  });
};

exports._meta = {
  version: 1,
};
