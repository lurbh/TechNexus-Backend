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
  db.createTable('Comments', {
    comment_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    article_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    comment_text: {
      type: 'text'
    },
    comment_date: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  }, () => {
    db.addForeignKey('Comments', 'News_Articles', 'fk_article_id', {
      'article_id': 'article_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('Comments', 'Users', 'fk_usercoments_id', {
        'user_id': 'user_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('Comments', callback);
};


exports._meta = {
  "version": 1
};
