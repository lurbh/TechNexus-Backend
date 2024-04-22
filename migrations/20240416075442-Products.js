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
  db.createTable('products', {
    id: {
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
      type: 'decimal', //{type: 'DECIMAL', length: '10, 6'}
      precision: "10", 
      scale: "2",
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
    db.addForeignKey('products', 'categories', 'products_categories_fk', {
      'category_id': 'id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('products', 'brands', 'products_brands_fk', {
        'brand_id': 'id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('products', 'products_categories_fk', () => {
    db.removeForeignKey('products', 'products_brands_fk', () => {
      db.dropTable('products', callback);
    });
  });
};

exports._meta = {
  "version": 1
};
