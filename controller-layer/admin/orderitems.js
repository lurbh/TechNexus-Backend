const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Categories')

router.get('/', async function(req,res){
    const categories = await serviceLayer.serviceGetCategories();
    res.render('categories/index', {
        categories: categories.toJSON()
    } );
});

router.get('/add-category', async function(req,res){
    const allCategories = (await serviceLayer.serviceGetCategories()).map( category => [ category.get('id'), category.get('category_name')]); 
    allCategories.push([0,"No Parent Category"])
    allCategories.sort((a, b) => a[0] - b[0]);
    const categoryForm = modelforms.createCategoryForm(allCategories);
    res.render('categories/create', {
        form: categoryForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-category', async function(req,res){
    const allCategories = (await serviceLayer.serviceGetCategories()).map( category => [ category.get('id'), category.get('category_name')]); 
    allCategories.push([0,"No Parent Category"])
    allCategories.sort((a, b) => a[0] - b[0]);
    const categoryForm = modelforms.createCategoryForm(allCategories);
    categoryForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_category_id === 0)
                delete form.data.parent_category_id;
            const category = await serviceLayer.serviceAddCategory(form);
            req.flash("success_messages", `New Category ${category.get('category_name')} has been created`)
            res.redirect("/admin/categories");
        },
        'empty': function(form) {
            res.render('categories/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('categories/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-category/:category_id', async function(req,res){
    const { category_id } = req.params;
    const category = await serviceLayer.serviceGetCategory(category_id)
    const allCategories = (await serviceLayer.serviceGetCategories()).map( category => [ category.get('id'), category.get('category_name')]); 
    allCategories.push([0,"No Parent Category"])
    allCategories.sort((a, b) => a[0] - b[0]);
    const categoryForm = modelforms.createCategoryForm(allCategories);
    for(let field in categoryForm.fields)
    {
        categoryForm.fields[field].value = category.get(field);
    }
    res.render('categories/update', {
        form: categoryForm.toHTML(modelforms.bootstrapField),
        'category': category.toJSON(),
    })
});

router.post('/update-category/:category_id', async function(req,res){
    const { category_id } = req.params;
    const categoryForm = modelforms.createCategoryForm();
    categoryForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_category_id === 0)
                delete form.data.parent_category_id;
            const category = await serviceLayer.serviceUpdateCategory(form, category_id);
            req.flash("success_messages", `Category ${category.get('category_name')} has been updated`)
            res.redirect("/admin/categories");
        },
        'empty': function(form) {
            res.render('categories/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('categories/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/delete-category/:category_id', async function(req,res){
    const { category_id } = req.params;
    const category = await serviceLayer.serviceGetCategory(category_id);

    res.render('categories/delete', {
        category: category.toJSON()
    })
})

router.post('/delete-category/:category_id', async function(req,res){
    const { category_id } = req.params;
    const response = await serviceLayer.serviceDelCategory(category_id);
    req.flash("success_messages", `Category ${response} has been Deleted`)
    res.redirect("/admin/categories");
})

module.exports = router;