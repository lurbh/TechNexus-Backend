const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/NewsArticles')
const userService = require('../../service-layer/Users')

router.get('/', async function(req,res){
    const newsArticles = await serviceLayer.serviceGetNewsArticles();
    res.render('newsArticles/index', {
        news: newsArticles.toJSON()
    } );
});

router.get('/add-new-article', async function(req,res){
    const allUser = (await userService.serviceGetOnlyUserType(4)).map( user => [ user.get('id'), user.get('username')]);
    const newsArticleForm = modelforms.createNewsArticleForm(allUser);
    res.render('newsArticles/create', {
        form: newsArticleForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-new-article', async function(req,res){
    const allUser = (await userService.serviceGetOnlyUserType(4)).map( user => [ user.get('id'), user.get('username')]);
    const newsArticleForm = modelforms.createNewsArticleForm(allUser);
    newsArticleForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_newsArticle_id === 0)
                delete form.data.parent_newsArticle_id;
            const newsArticle = await serviceLayer.serviceAddNewsArticle(form);
            req.flash("success_messages", `New NewsArticle ${newsArticle.get('newsArticle_name')} has been created`)
            res.redirect("/admin/news");
        },
        'empty': function(form) {
            res.render('newsArticles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('newsArticles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-new-article/:newsArticle_id', async function(req,res){
    const { newsArticle_id } = req.params;
    const newsArticle = await serviceLayer.serviceGetNewsArticle(newsArticle_id)
    const allUser = (await userService.serviceGetOnlyUserType(4)).map( user => [ user.get('id'), user.get('username')]);
    const newsArticleForm = modelforms.createNewsArticleForm(allUser);
    for(let field in newsArticleForm.fields)
    {
        newsArticleForm.fields[field].value = newsArticle.get(field);
    }
    res.render('newsArticles/update', {
        form: newsArticleForm.toHTML(modelforms.bootstrapField),
        'newsArticle': newsArticle.toJSON(),
    })
});

router.post('/update-new-article/:newsArticle_id', async function(req,res){
    const { newsArticle_id } = req.params;
    const allUser = (await userService.serviceGetOnlyUserType(4)).map( user => [ user.get('id'), user.get('username')]);
    const newsArticleForm = modelforms.createNewsArticleForm(allUser);
    newsArticleForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_newsArticle_id === 0)
                delete form.data.parent_newsArticle_id;
            const newsArticle = await serviceLayer.serviceUpdateNewsArticle(form, newsArticle_id);
            req.flash("success_messages", `NewsArticle ${newsArticle.get('newsArticle_name')} has been updated`)
            res.redirect("/admin/news");
        },
        'empty': function(form) {
            res.render('newsArticles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('newsArticles/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/delete-new-article/:newsArticle_id', async function(req,res){
    const { newsArticle_id } = req.params;
    const newsArticle = await serviceLayer.serviceGetNewsArticle(newsArticle_id);

    res.render('newsArticles/delete', {
        newsArticle: newsArticle.toJSON()
    })
})

router.post('/delete-new-article/:newsArticle_id', async function(req,res){
    const { newsArticle_id } = req.params;
    const response = await serviceLayer.serviceDelNewsArticle(newsArticle_id);
    req.flash("success_messages", `NewsArticle ${response} has been Deleted`)
    res.redirect("/admin/news");
})

module.exports = router;