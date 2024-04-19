const bookshelf = require('../bookshelf');

const Role = bookshelf.model('Role', {
    tableName:'roles',
    users:function() {
        return this.hasMany('User', 'role')
    }
} )

const Brand = bookshelf.model('Brand', {
    tableName:'brands',
    products:function() {
        return this.hasMany('Product', 'brand_id')
    }
} )

const Order_Status = bookshelf.model('Order_Status', {
    tableName:'order_statuses',
    orders:function() {
        return this.hasMany('Order', 'status_id')
    }
} )

const Category = bookshelf.model('Category', {
    tableName:'categories',
    products:function() {
        return this.hasMany('Product', 'category_id')
    },
    parentCategory:function() {
        return this.belongsTo('Category', 'parent_category_id');
      },
    childCategories:function() {
        return this.hasMany('Category', 'parent_category_id');
      }
} )

const User = bookshelf.model('User', {
    tableName:'users',
    roles:function() {
        return this.belongsTo('Role')
    },
    reviews:function() {
        return this.hasMany('Review', 'user_id')
    },
    commnets:function() {
        return this.hasMany('Comment', 'user_id')
    }
} )

const Product = bookshelf.model('Product', {
    tableName: 'products',
    brands:function() {
        return this.belongsTo('Brand')
    },
    category:function() {
        return this.belongsTo('Category'); 
    },
    order_items:function() {
        return this.hasMany('Order_Item', 'product_id')
    },
    reviews:function() {
        return this.hasMany('Review', 'product_id')
    }
})

const Order = bookshelf.model('Order' , {
    tableName: 'orders',
    status:function() {
        return this.belongsTo('Order_Status')
    },
    order_items:function() {
        return this.hasMany('Order_Item', 'order_id')
    }
})

const Order_Item = bookshelf.model('Order_Item', {
    tableName: 'order_items',
    products:function() {
        return this.belongsTo('Product')
    },
    order:function() {
        return this.belongsTo('Order')
    }
})

const Review = bookshelf.model('Review', {
    tableName: 'reviews',
    user:function() {
        return this.belongsTo('User');
    },
    products:function() {
        return this.belongsTo('Product')
    }
})

const News_Article = bookshelf.model('News_Article', {
    tableName: 'news_articles',
    user:function() {
        return this.belongsTo('User');
    },
    comments:function() {
        return this.hasMany('Comment', 'article_id')
    }
}) 

const Comment = bookshelf.model('Comment', {
    tableName: 'comments', 
    article:function() {
        return this.belongsTo('News_Article')
    },
    user:function() {
        return this.belongsTo('User')
    }
})

const Cart_Items = bookshelf.model('Cart_Items', {
    tableName: 'cart_items',
    product:function() {
        return this.belongsTo('Produts')
    },
    user:function() {
        return this.belongsTo('User')
    }
})


module.exports = {  
                    Role, 
                    Brand, 
                    Order_Status, 
                    Category, 
                    User, 
                    Product, 
                    Order, 
                    Order_Item, 
                    Review,
                    News_Article,
                    Comment 
                }