const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Brands')

router.get('/', async function(req,res){
    const brands = await serviceLayer.serviceGetBrands();
    res.render('brands/index', {
        brands: brands.toJSON()
    } );
});

router.get('/add-brands', async function(req,res){
    const brandForm = modelforms.createBrandForm();
    res.render('brands/create', {
        form: brandForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-brands', async function(req,res){
    const brandForm = modelforms.createBrandForm();
    brandForm.handle(req, {
        'success': async function(form) {
            const brand = await serviceLayer.serviceAddBrand(form);
            req.flash("success_messages", `New Brand ${brand.get('brand_name')} has been created`)
            res.redirect("/admin/brands");
        },
        'empty': function(form) {
            res.render('brands/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('brands/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-brands/:brand_id', async function(req,res){
    const { brand_id } = req.params;
    const brand = await serviceLayer.serviceGetBrand(brand_id)
    const brandForm = modelforms.createBrandForm();
    for(let field in brandForm.fields)
    {
        brandForm.fields[field].value = brand.get(field);
    }
    res.render('brands/update', {
        form: brandForm.toHTML(modelforms.bootstrapField),
        'brand': brand.toJSON(),
    })
});

router.post('/update-brands/:brand_id', async function(req,res){
    const { brand_id } = req.params;
    const brandForm = modelforms.createBrandForm();
    brandForm.handle(req, {
        'success': async function(form) {
            const brand = await serviceLayer.serviceUpdateBrand(form, brand_id);
            req.flash("success_messages", `Brand ${brand.get('brand_name')} has been updated`)
            res.redirect("/admin/brands");
        },
        'empty': function(form) {
            res.render('brands/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('brands/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/delete-brands/:user_id', async function(req,res){
    const { user_id } = req.params;
    const user = await serviceLayer.serviceGetBrand(user_id);

    res.render('brands/delete', {
        user: user.toJSON()
    })
})

router.post('/delete-brands/:user_id', async function(req,res){
    const { user_id } = req.params;
    const response = await serviceLayer.serviceDelBrand(user_id);
    req.flash("success_messages", `Brand ${response} has been Deleted`)
    res.redirect("/admin/brands");
})

module.exports = router;