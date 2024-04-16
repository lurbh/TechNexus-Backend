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
  db.createTable('Order_Statuses', {
      status_id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
      status_name: { type: 'string', length: 50, notNull: true }
  }, () => {
      db.addIndex('Order_Statuses', 'unique_status_name', 'status_name', true, callback);
  });
};

exports.down = function(db, callback) {
  db.dropTable('Order_Statuses', callback);
};

exports._meta = {
  "version": 1
};
