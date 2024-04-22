const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Reviews')

router.get('/', async function(req,res){
    console.log(serviceLayer);
    const reviews = await serviceLayer.serviceGetReviews();
    console.log(reviews);
    res.render('reviews/index', {
        reviews: reviews.toJSON()
    } );
});

router.get('/add-reviews', async function(req,res){
    const reviewForm = modelforms.createReviewForm();
    res.render('reviews/create', {
        form: reviewForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-reviews', async function(req,res){
    const reviewForm = modelforms.createReviewForm();
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

router.get('/update-reviews/:review_id', async function(req,res){
    const { review_id } = req.params;
    const review = await serviceLayer.serviceGetReview(review_id)
    const reviewForm = modelforms.createReviewForm();
    for(let field in reviewForm.fields)
    {
        reviewForm.fields[field].value = review.get(field);
    }
    res.render('reviews/update', {
        form: reviewForm.toHTML(modelforms.bootstrapField),
        'review': review.toJSON(),
    })
});

router.post('/update-reviews/:review_id', async function(req,res){
    const { review_id } = req.params;
    const reviewForm = modelforms.createReviewForm();
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

router.get('/delete-reviews/:review_id', async function(req,res){
    const { review_id } = req.params;
    const review = await serviceLayer.serviceGetReview(review_id);

    res.render('reviews/delete', {
        review: review.toJSON()
    })
})

router.post('/delete-reviews/:review_id', async function(req,res){
    const { review_id } = req.params;
    const response = await serviceLayer.serviceDelReview(review_id);
    req.flash("success_messages", `Review ${response} has been Deleted`)
    res.redirect("/admin/reviews");
})

module.exports = router;