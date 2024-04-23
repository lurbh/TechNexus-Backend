const models = require("../models");

const getAllReviewsDAL = async () => {
    try {
        return await models.Review.fetchAll({
            withRelated: ['user','products']
        });
    } catch (error) {
        console.log("Error getting Reviews", error)
    }
}

const getReviewDAL = async (review_id) => {
    try {
        return await models.Review.where({
            'id': review_id
        }).fetch({
            withRelated: ['user','products']
        });
    } catch (error) {
        console.log("Error getting Review", error)
    }
}

const addReviewDAL = async (reviewForm) => {
    try {
        const review = new models.Review();
        const {...reviewData} = reviewForm.data;
        review.set(reviewData);
        await review.save();
        return review;
    } catch (error) {
        console.log("Error creating Review", error)
    }
}

const updateReviewDAL = async (reviewForm, review_id) => {
    try {
        const review = await models.Review.where({
            'id': review_id
        }).fetch({
            withRelated: ['user','products']
        });
        const {...reviewData} = reviewForm.data;
        review.set(reviewData);
        await review.save();
        return review;
    } catch (error) {
        console.log("Error updating Review", error)
    }
}

const deleteReviewDAL = async (review_id) => {
    try {
        const review = await models.Review.where({
            'id': review_id
        }).fetch({
            withRelated: ['user','products']
        });
        await review.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting Review", error)
    }
}

module.exports = {
    getAllReviewsDAL,
    getReviewDAL,
    addReviewDAL,
    updateReviewDAL,
    deleteReviewDAL
}