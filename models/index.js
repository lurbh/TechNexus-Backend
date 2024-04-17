const bookshelf = require('../bookshelf');

const Role = bookshelf.model('Role', {
    tableName:'roles',
    users() {
        return this.hasMany('User', 'role')
    }
} )

const Brand = bookshelf.model('Brand', {
    tableName:'brands',
    products() {
        return this.hasMany('Product', 'brand_id')
    }
} )

const Order_Status = bookshelf.model('Order_Status', {
    tableName:'order_statuses',
    orders() {
        return this.hasMany('Order', 'status_id')
    }
} )

const Category = bookshelf.model('Category', {
    tableName:'categories',
    products() {
        return this.hasMany('Product', 'category_id')
    }
} )

const User = bookshelf.model('User', {
    tableName:'users',
    roles() {
        return this.belongsTo('Role')
    },
    reviews() {
        return this.hasMany('Review', 'user_id')
    },
    commnets() {
        return this.hasMany('Comment', 'user_id')
    }
} )

const Product = bookshelf.model('Product', {
    tableName: 'products',
    brands() {
        return this.belongsTo('Brand')
    },
    categories() {
        return this.belongsTo('Category')
    },
    order_items() {
        return this.hasMany('Order_Item', 'product_id')
    },
    reviews() {
        return this.hasMany('Review', 'product_id')
    }
})

const Order = bookshelf.model('Order' , {
    tableName: 'orders',
    status() {
        return this.belongsTo('Order_Status')
    },
    order_items() {
        return this.hasMany('Order_Item', 'order_id')
    }
})

const Order_Item = bookshelf.model('Order_Item', {
    tableName: 'order_items',
    products() {
        return this.belongsTo('Product')
    },
    order() {
        return this.belongsTo('Order')
    }
})

const Review = bookshelf.model('Review', {
    tableName: 'reviews',
    user() {
        return this.belongsTo('User');
    },
    products() {
        return this.belongsTo('Product')
    }
})

const News_Article = bookshelf.model('News_Article', {
    tableName: 'news_articles',
    user() {
        return this.belongsTo('User');
    },
    comments() {
        return this.hasMany('Comment', 'article_id')
    }
}) 

const Comment = bookshelf.model('Comment', {
    tableName: 'comments', 
    article() {
        return this.belongsTo('News_Article')
    },
    user() {
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