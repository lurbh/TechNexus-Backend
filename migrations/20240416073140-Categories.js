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
  db.createTable('Categories', {
      category_id: { type: 'int', primaryKey: true, unsigned: true, autoIncrement: true },
      category_name: { type: 'string', length: 100, notNull: true },
      parent_category_id: { type: 'int', unsigned: true },
      category_img_url: { type: 'string', length: 255 }
  }, () => {
      db.addForeignKey('Categories', 'Categories', 'Categories_parent_category_id_foreign',
          {
              'parent_category_id': 'category_id'
          },
          {
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE'
          },
          callback
      );
  });
};

exports.down = function(db, callback) {
  db.removeForeignKey('Categories', 'Categories_parent_category_id_foreign', () => {
      db.dropTable('Categories', callback);
  });
};

exports._meta = {
  "version": 1
};
