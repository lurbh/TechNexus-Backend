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
  db.createTable('Reviews', {
    review_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    product_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    rating: {
      type: 'int'
    },
    review_text: {
      type: 'text'
    },
    review_date: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  }, () => {
    db.addForeignKey('Reviews', 'Products', 'reviews_products_fk', {
      'product_id': 'product_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('Reviews', 'Users', 'reviews_users_fk', {
        'user_id': 'user_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('Reviews', 'reviews_products_fk', () => {
    db.removeForeignKey('Reviews', 'reviews_users_fk', () => {
      db.dropTable('Reviews', callback);
    });
  });
};

exports._meta = {
  "version": 1
};
