const express = require("express");
const router =  express.Router();

const models = require('../models');
const modelforms = require('../forms');

const productRoutes = require("./admin/product");

router.get('/', function(req,res){
    res.render('admin/index')
})

router.use("/products" , productRoutes);

// router.get('/products', async function(req,res){
//     // use the Product model to get all the products
//     const products = await models.Product.collection().fetch({
//         withRelated:['brands', 'category']
//     });
//     // products.toJSON() convert the table rows into JSON data format
//     res.render('products/index', {
//         products: products.toJSON()
//     } );
// });

// router.get('/add-product', async function(req,res){

//     const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
//     const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
//     const productForm = modelforms.createProductForm(allCategories, allBrands);
//     res.render('products/create', {
//         form: productForm.toHTML(modelforms.bootstrapField)
//     })
// });

// router.post('/add-product', async function(req,res){
//     const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
//     const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
//     const productForm = modelforms.createProductForm(allCategories, allBrands);
//     productForm.handle(req, {
//         'success': async function(form) {
//             const product = new models.Product();
//             const {...productData} = form.data;
//             product.set(productData);
//             await product.save();
            
//             res.redirect("/admin/products");
//         },
//         'empty': function(form) {
//             res.render('products/create', {
//                 form: form.toHTML(modelforms.bootstrapField)
//             })
//         },
//         'error': function(form) {
//             res.render('products/create', {
//                 form: form.toHTML(modelforms.bootstrapField)
//             })
//         }
//     })
// });

// router.get('/add-product', async function(req,res){

//     const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
//     const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
//     const productForm = modelforms.createProductForm(allCategories, allBrands);
//     res.render('products/create', {
//         form: productForm.toHTML(modelforms.bootstrapField)
//     })
// })

module.exports = router;