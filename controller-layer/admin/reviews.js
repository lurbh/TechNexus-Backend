const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Reviews')
const productService = require('../../service-layer/Product')
const userService = require('../../service-layer/Users')

router.get('/', async function(req,res){
    const reviews = await serviceLayer.serviceGetReviews();
    res.render('reviews/index', {
        reviews: reviews.toJSON()
    } );
});

router.get('/add-review', async function(req,res){
    const allProducts = (await productService.serviceGetAllProducts()).map( product => [ product.get('id'), product.get('product_name')]);
    const allUser = (await userService.serviceGetOnlyUserType(2)).map( user => [ user.get('id'), user.get('username')]);
    const reviewForm = modelforms.createReviewForm(allProducts,allUser);
    res.render('reviews/create', {
        form: reviewForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-review', async function(req,res){
    const allProducts = (await productService.serviceGetAllProducts()).map( product => [ product.get('id'), product.get('product_name')]);
    const allUser = (await userService.serviceGetOnlyUserType(2)).map( user => [ user.get('id'), user.get('username')]);
    const reviewForm = modelforms.createReviewForm(allProducts,allUser);
    reviewForm.handle(req, {
        'success': async function(form) {
            const review = await serviceLayer.serviceAddReview(form);
            req.flash("success_messages", `New Review ${review.get('review_name')} has been created`)
            res.redirect("/admin/reviews");
        },
        'empty': function(form) {
            res.render('reviews/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('reviews/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-review/:review_id', async function(req,res){
    const { review_id } = req.params;
    const review = await serviceLayer.serviceGetReview(review_id)
    const allProducts = (await productService.serviceGetAllProducts()).map( product => [ product.get('id'), product.get('product_name')]);
    const allUser = (await userService.serviceGetOnlyUserType(2)).map( user => [ user.get('id'), user.get('username')]);
    const reviewForm = modelforms.createReviewForm(allProducts,allUser);
    for(let field in reviewForm.fields)
    {
        reviewForm.fields[field].value = review.get(field);
    }
    res.render('reviews/update', {
        form: reviewForm.toHTML(modelforms.bootstrapField),
        'review': review.toJSON(),
    })
});

router.post('/update-review/:review_id', async function(req,res){
    const { review_id } = req.params;
    const allProducts = (await productService.serviceGetAllProducts()).map( product => [ product.get('id'), product.get('product_name')]);
    const allUser = (await userService.serviceGetOnlyUserType(2)).map( user => [ user.get('id'), user.get('username')]);
    const reviewForm = modelforms.createReviewForm(allProducts,allUser);
    reviewForm.handle(req, {
        'success': async function(form) {
            const review = await serviceLayer.serviceUpdateReview(form, review_id);
            req.flash("success_messages", `Review ${review.get('review_name')} has been updated`)
            res.redirect("/admin/reviews");
        },
        'empty': function(form) {
            res.render('reviews/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('reviews/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/delete-review/:review_id', async function(req,res){
    const { review_id } = req.params;
    const review = await serviceLayer.serviceGetReview(review_id);

    res.render('reviews/delete', {
        review: review.toJSON()
    })
})

router.post('/delete-review/:review_id', async function(req,res){
    const { review_id } = req.params;
    const response = await serviceLayer.serviceDelReview(review_id);
    req.flash("success_messages", `Review has been Deleted`)
    res.redirect("/admin/reviews");
})

module.exports = router;