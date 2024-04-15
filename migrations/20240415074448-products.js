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

exports.up = function(db) {
  db.createTable('Products', {
    product_id: { type: 'int', primaryKey: true, unsigned: true },
    product_name: { type: 'string', length: 255, notNull: true },
    category_id: { type: 'int', unsigned: true },
    brand_id: { type: 'int', unsigned: true },
    description: { type: 'text' },
    price: { type: 'decimal', length: '10,2', notNull: true },
    quantity_available: { type: 'int', unsigned: true, notNull: true }
  });

  // Add foreign key constraints separately
  db.addForeignKey('Products', 'Categories', 'Products_categories_id_foreign',
    {
      'category_id': 'category_id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  );

  db.addForeignKey('Products', 'Brands', 'Products_brands_id_foreign',
    {
      'brand_id': 'brand_id'
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    }
  );
};

exports.down = function(db) {
  db.removeForeignKey('Products', 'Products_categories_id_foreign', callback);
  db.removeForeignKey('Products', 'Products_brands_id_foreign', callback);

  db.dropTable('Products', callback);
};

exports._meta = {
  "version": 1
};
