const commentDAL = require("../data-access-layer/CommentsDAL");

const serviceGetComments = async () => {
  const comments = await commentDAL.getAllCommentsDAL();
  return comments;
};

const serviceGetComment = async (comment_id) => {
  const comment = await commentDAL.getCommentDAL(comment_id);
  return comment;
};

const serviceAddComment = async (commentForm) => {
  const response = await commentDAL.addCommentDAL(commentForm);
  return response;
};

const serviceUpdateComment = async (commentForm, comment_id) => {
  const response = await commentDAL.updateCommentDAL(commentForm, comment_id);
  return response;
};

const serviceDelComment = async (comment_id) => {
  const response = await commentDAL.deleteCommentDAL(comment_id);
  return response;
};

module.exports = {
  serviceGetComments,
  serviceGetComment,
  serviceAddComment,
  serviceUpdateComment,
  serviceDelComment,
};
