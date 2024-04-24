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
  db.createTable('users', {
      id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
      username: { type: 'string', length: 50, notNull: true },
      email: { type: 'string', length: 100, notNull: true },
      password_hash: { type: 'string', length: 255, notNull: true },
      registration_date: { type: 'datetime', defaultValue: 'CURRENT_TIMESTAMP' },
      role_id: { type: 'int', unsigned: true },
      // Add other user profile information fields as needed
  }, () => {
      db.addForeignKey('users', 'roles', 'Users_roles_foreign',
          {
              'Role_id': 'id'
          },
          {
              onDelete: 'RESTRICT',
              onUpdate: 'RESTRICT'
          },
          callback
      );
      db.addIndex('users', 'unique_email', 'email', true, callback);
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('users', 'Users_roles_foreign', () => {
      db.dropTable('users', callback);
  });
};

exports._meta = {
  "version": 1
};
