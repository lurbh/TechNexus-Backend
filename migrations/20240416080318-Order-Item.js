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
  db.createTable('Order_Items', {
    order_item_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    order_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    product_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    quantity: {
      type: 'int',
      unsigned: true
    },
    unit_price: {
      type: 'decimal',
      length: '10,2'
    }
  }, () => {
    db.addForeignKey('Order_Items', 'Orders', 'fk_order_id', {
      'order_id': 'order_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('Order_Items', 'Products', 'fk_orderproduct_id', {
        'product_id': 'product_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('Order_Items', callback);
};


exports._meta = {
  "version": 1
};
