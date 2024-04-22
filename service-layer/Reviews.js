const reviewDAL = require("../data-access-layer/ReviewsDAL");

const serviceGetReviews = async () => {
    const reviews = await reviewDAL.getAllReviewsDAL();
    return reviews;
} 

const serviceGetReview = async (review_id) => {
    const review =  await reviewDAL.getReviewDAL(review_id);
    return review;
} 

const serviceAddReview = async (reviewForm) => {
    const response = await reviewDAL.addReviewDAL(reviewForm);
    return response;
} 

const serviceUpdateReview = async (reviewForm, review_id) => {
    const response = await reviewDAL.updateReviewDAL(reviewForm, review_id);
    return response;
} 

const serviceDelReview = async (review_id) => {
    const response = await reviewDAL.deleteReviewDAL(review_id);
    return response;
} 

module.exports = {
    serviceGetReviews,
    serviceGetReview,
    serviceAddReview,
    serviceUpdateReview,
    serviceDelReview
}