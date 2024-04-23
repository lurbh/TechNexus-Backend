const express = require("express");
const router =  express.Router();

const { checkIfAuthenticated } = require('../middleware');

const models = require('../models');
const modelforms = require('../forms');

const productRoutes = require("./admin/product");
const brandsRoutes = require("./admin/brands");
const userRoutes = require("./admin/users");
const rolesRoutes = require("./admin/roles")
const categoriesRoutes = require("./admin/category")
const reviewsRoutes = require("./admin/reviews")
const newsRoutes = require("./admin/news")
const commentsRoutes = require("./admin/comments")

router.get('/', checkIfAuthenticated, function(req,res){
    res.render('admin/index')
})

router.use("/products" , checkIfAuthenticated , productRoutes);
router.use("/users" , userRoutes);
router.use("/brands" , checkIfAuthenticated , brandsRoutes);
router.use("/roles" , checkIfAuthenticated, rolesRoutes)
router.use("/categories", checkIfAuthenticated, categoriesRoutes)
router.use("/reviews", checkIfAuthenticated, reviewsRoutes)
router.use("/news", checkIfAuthenticated, newsRoutes)
router.use("/comments", checkIfAuthenticated, commentsRoutes)

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