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
  db.createTable('brands', {
      id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
      brand_name: { type: 'string', length: 100, notNull: true },
      country_of_origin: { type: 'string', length: 100 }
      // Add other brand-related fields as needed
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('brands', callback);
};

exports._meta = {
  "version": 1
};
