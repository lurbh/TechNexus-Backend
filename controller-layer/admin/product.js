const express = require("express");
const router =  express.Router();

const models = require('../../models');
const modelforms = require('../../forms');

router.get('/', async function(req,res){
    // use the Product model to get all the products
    const products = await models.Product.collection().fetch({
        withRelated:['brands', 'category']
    });
    // products.toJSON() convert the table rows into JSON data format
    res.render('products/index', {
        products: products.toJSON()
    } );
});

router.get('/add-product', async function(req,res){

    const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
    const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
    const productForm = modelforms.createProductForm(allCategories, allBrands);
    res.render('products/create', {
        form: productForm.toHTML(modelforms.bootstrapField)
    })
});

router.post('/add-product', async function(req,res){
    const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
    const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
    const productForm = modelforms.createProductForm(allCategories, allBrands);
    productForm.handle(req, {
        'success': async function(form) {
            const product = new models.Product();
            const {...productData} = form.data;
            product.set(productData);
            await product.save();
            req.flash("success_messages", `New Product ${product.get('product_name')} has been created`)
            res.redirect("/admin/products");
        },
        'empty': function(form) {
            res.render('products/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('products/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-product/:product_id', async function(req,res){

    const { product_id } = req.params;
    const product = await models.Product.where({
        'id': product_id
    }).fetch({
        require: true
    }); 
    const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
    const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
    const productForm = modelforms.createProductForm(allCategories, allBrands);
    productForm.fields.product_name.value = product.get('product_name');
    productForm.fields.price.value = product.get('price');
    productForm.fields.description.value = product.get('description');
    productForm.fields.category_id.value = product.get('category_id');
    productForm.fields.quantity_available.value = product.get('quantity_available');
    productForm.fields.brand_id.value = product.get('brand_id');
    res.render('products/update', {
        form: productForm.toHTML(modelforms.bootstrapField),
        'product': product.toJSON()
    })
})

router.post('/update-product/:product_id', async function(req,res){
    const { product_id } = req.params;
    const allCategories = await models.Category.fetchAll().map( category => [ category.get('id'), category.get('category_name')]);
    const allBrands = await models.Brand.fetchAll().map (t => [t.get('id'), t.get('brand_name')]);
    const productForm = modelforms.createProductForm(allCategories, allBrands);
    productForm.handle(req, {
        'success': async function(form) {
            const product = await models.Product.where({
                'id': req.params.product_id
            }).fetch({
                require: true
            });
            const {...productData} = form.data;
            product.set(productData);
            await product.save();
            req.flash("success_messages", `Product ${product.get('product_name')} has been Updated`)
            res.redirect("/admin/products");
        },
        'empty': function(form) {
            res.render('products/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('products/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
})

router.get('/delete-product/:product_id', async function(req,res){
    const product = await models.Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });

    res.render('products/delete', {
        product: product.toJSON()
    })
})

router.post('/delete-product/:product_id', async function(req,res){
    const product = await models.Product.where({
        'id': req.params.product_id
    }).fetch({
        required: true
    });
    req.flash("success_messages", `Product ${product.get('product_name')} has been Deleted`)
    await product.destroy();
    res.redirect("/admin/products");
})

module.exports = router;