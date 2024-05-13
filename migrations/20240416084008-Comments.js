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
    "comments",
    {
      id: {
        type: "int",
        primaryKey: true,
        unsigned: true,
        autoIncrement: true,
      },
      news_article_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      user_id: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      comment_text: {
        type: "text",
      },
      comment_date: {
        type: "datetime",
        defaultValue: "NOW()",
      },
    },
    () => {
      db.addForeignKey(
        "comments",
        "news_articles",
        "comments_news_articles_fk",
        {
          news_article_id: "id",
        },
        {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        () => {
          db.addForeignKey(
            "comments",
            "users",
            "comments_users_fk",
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
    },
  );
};

exports.down = function (db, callback) {
  db.removeForeignKey("comments", "comments_news_articles_fk", () => {
    db.removeForeignKey("comments", "comments_users_fk", () => {
      db.dropTable("comments", callback);
    });
  });
};

exports._meta = {
  version: 1,
};
