const bookshelf = require('../bookshelf');

const Roles = bookshelf.model('Roles', {
    tableName:'roles',
    users() {
        return this.hasMany('Users', 'role')
    }
} )

const Brands = bookshelf.model('Brands', {
    tableName:'brands',
    products() {
        return this.hasMany('Products', 'brand_id')
    }
} )

const Order_Statuses = bookshelf.model('Order_Statuses', {
    tableName:'order_statuses',
    orders() {
        return this.hasMany('Orders', 'status_id')
    }
} )

const Categories = bookshelf.model('Categories', {
    tableName:'categories',
    products() {
        return this.hasMany('Products', 'category_id')
    }
} )

const Users = bookshelf.model('Users', {
    tableName:'users',
    roles() {
        return this.belongsTo('Roles')
    },
    reviews() {
        return this.hasMany('Reviews', 'user_id')
    },
    commnets() {
        return this.hasMany('Comments', 'user_id')
    }
} )

const Products = bookshelf.model('Products', {
    tableName: 'products',
    brands() {
        return this.belongsTo('Brands')
    },
    categories() {
        return this.belongsTo('Categories')
    },
    order_items() {
        return this.hasMany('Order_Items', 'product_id')
    },
    reviews() {
        return this.hasMany('Reviews', 'product_id')
    }
})

const Orders = bookshelf.model('Orders' , {
    tableName: 'orders',
    status() {
        return this.belongsTo('Order_Statuses')
    },
    order_items() {
        return this.hasMany('Order_Items', 'order_id')
    }
})

const Order_Items = bookshelf.model('Order_Items', {
    tableName: 'order_items',
    products() {
        return this.belongsTo('Products')
    },
    order() {
        return this.belongsTo('Orders')
    }
})

const Reviews = bookshelf.model('Reviews', {
    tableName: 'reviews',
    user() {
        return this.belongsTo('User');
    },
    products() {
        return this.belongsTo('Products')
    }
})

const News_Articles = bookshelf.model('News_Articles', {
    tableName: 'news_articles',
    user() {
        return this.belongsTo('User');
    },
    comments() {
        return this.hasMany('Comments', 'article_id')
    }
}) 

const Comments = bookshelf.model('Comments', {
    tableName: 'comments', 
    article() {
        return this.belongsTo('News_Articles')
    },
    user() {
        return this.belongsTo('User')
    }
})


module.exports = {  
                    Roles, 
                    Brands, 
                    Order_Statuses, 
                    Categories, 
                    Users, 
                    Products, 
                    Orders, 
                    Order_Items, 
                    Reviews,
                    News_Articles,
                    Comments 
                }