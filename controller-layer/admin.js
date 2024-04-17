const express = require("express");
const router =  express.Router();

const models = require('../models');

router.get('/', function(req,res){
    res.render('admin/index')
})

router.get('/products', async function(req,res){
    // use the Product model to get all the products
    const products = await models.Product.collection().fetch();
    // products.toJSON() convert the table rows into JSON data format
    res.render('products/index', {
        products: products.toJSON()
    } );
});

module.exports = router;