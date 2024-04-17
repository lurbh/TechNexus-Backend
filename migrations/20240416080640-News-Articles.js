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

exports.up = function(db, callback) {
  db.createTable('News_Articles', {
    article_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    title: {
      type: 'string',
      length: 255,
      notNull: true
    },
    content: {
      type: 'text'
    },
    publication_date: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    author_id: {
      type: 'int',
      unsigned: true
    }
  }, () => {
    db.addForeignKey('News_Articles', 'Users', 'news_articles_users_fk', {
      'author_id': 'user_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, callback);
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('News_Articles', 'news_articles_users_fk', () => {
    db.dropTable('News_Articles', callback);
  });
};


exports._meta = {
  "version": 1
};
