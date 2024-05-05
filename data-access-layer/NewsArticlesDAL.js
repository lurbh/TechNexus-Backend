const models = require("../models");

const getAllNewsArticlesDAL = async () => {
  try {
    return await models.News_Article.fetchAll({
      withRelated: ["user"],
    });
  } catch (error) {
    console.log("Error getting News Article", error);
  }
};

const getNewsArticleDAL = async (newsArticle_id) => {
  try {
    return await models.News_Article.where({
      id: newsArticle_id,
    }).fetch({
      require: true,
    });
  } catch (error) {
    console.log("Error getting News Article", error);
  }
};

const addNewsArticleDAL = async (newsArticleForm) => {
  try {
    const newsArticle = new models.News_Article();
    const { ...newsArticleData } = newsArticleForm.data;
    newsArticle.set(newsArticleData);
    await newsArticle.save();
    return newsArticle;
  } catch (error) {
    console.log("Error creating News Article", error);
  }
};

const updateNewsArticleDAL = async (newsArticleForm, newsArticle_id) => {
  try {
    const newsArticle = await models.News_Article.where({
      id: newsArticle_id,
    }).fetch({
      require: true,
    });
    const { ...newsArticleData } = newsArticleForm.data;
    newsArticle.set(newsArticleData);
    await newsArticle.save();
    return newsArticle;
  } catch (error) {
    console.log("Error updating News Article", error);
  }
};

const deleteNewsArticleDAL = async (newsArticle_id) => {
  try {
    const newsArticle = await models.News_Article.where({
      id: newsArticle_id,
    }).fetch({
      require: true,
    });
    const name = newsArticle.get("title");
    await newsArticle.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting News Article", error);
  }
};

module.exports = {
  getAllNewsArticlesDAL,
  getNewsArticleDAL,
  addNewsArticleDAL,
  updateNewsArticleDAL,
  deleteNewsArticleDAL,
};
