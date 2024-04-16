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
  db.createTable('Products', {
    product_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    product_name: {
      type: 'string',
      length: 255,
      notNull: true
    },
    category_id: {
      type: 'int',
      unsigned: true
    },
    brand_id: {
      type: 'int',
      unsigned: true
    },
    description: {
      type: 'text'
    },
    price: {
      type: 'decimal',
      length: '10,2',
      notNull: true
    },
    quantity_available: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    created_on: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    last_updated: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    }
  }, () => {
    db.addForeignKey('Products', 'Categories', 'fk_category_id', {
      'category_id': 'category_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, () => {
      db.addForeignKey('Products', 'Brands', 'fk_brand_id', {
        'brand_id': 'brand_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('Products', callback);
};

exports._meta = {
  "version": 1
};
