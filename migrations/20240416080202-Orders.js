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
    db.addForeignKey('Orders', 'Users', 'fk_user_id', {
      'user_id': 'user_id'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }, () => {
      db.addForeignKey('Orders', 'Order_Statuses', 'fk_status_id', {
        'status_id': 'status_id'
      }, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }, callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('Orders', callback);
};


exports._meta = {
  "version": 1
};
