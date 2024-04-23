const newsArticleDAL = require("../data-access-layer/NewsArticlesDAL");

const serviceGetNewsArticles = async () => {
    const newsArticles = await newsArticleDAL.getAllNewsArticlesDAL();
    return newsArticles;
} 

const serviceGetNewsArticle = async (newsArticle_id) => {
    const newsArticle =  await newsArticleDAL.getNewsArticleDAL(newsArticle_id);
    return newsArticle;
} 

const serviceAddNewsArticle = async (newsArticleForm) => {
    const response = await newsArticleDAL.addNewsArticleDAL(newsArticleForm);
    return response;
} 

const serviceUpdateNewsArticle = async (newsArticleForm, newsArticle_id) => {
    const response = await newsArticleDAL.updateNewsArticleDAL(newsArticleForm, newsArticle_id);
    return response;
} 

const serviceDelNewsArticle = async (newsArticle_id) => {
    const response = await newsArticleDAL.deleteNewsArticleDAL(newsArticle_id);
    return response;
} 

module.exports = {
    serviceGetNewsArticles,
    serviceGetNewsArticle,
    serviceAddNewsArticle,
    serviceUpdateNewsArticle,
    serviceDelNewsArticle
}