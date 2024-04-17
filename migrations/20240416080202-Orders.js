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
  db.createTable('Orders', {
    order_id: {
      type: 'int',
      primaryKey: true,
      unsigned: true,
      autoIncrement: true
    },
    user_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    order_date: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    status_id: {
      type: 'int',
      unsigned: true
    }
  }, () => {
    db.addForeignKey('Orders', 'Users', 'orders_users_fk', {
      'user_id': 'user_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('Orders', 'Order_Statuses', 'orders_order_status_fk', {
        'status_id': 'status_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('Orders', 'orders_users_fk', () => {
    db.removeForeignKey('Orders', 'orders_order_status_fk', () => {
      db.dropTable('Orders', callback);
    });
  });
};


exports._meta = {
  "version": 1
};
