const models = require("../models");

const getAllCommentsDAL = async () => {
    try {
        return await models.Comment.fetchAll({
            withRelated: ['user','article']
        });
    } catch (error) {
        console.log("Error getting Comments", error)
    }
}

const getCommentDAL = async (comment_id) => {
    try {
        return await models.Comment.where({
            'id': comment_id
        }).fetch({
            withRelated: ['user','article']
        });
    } catch (error) {
        console.log("Error getting Comment", error)
    }
}

const addCommentDAL = async (commentForm) => {
    try {
        const comment = new models.Comment();
        const {...commentData} = commentForm.data;
        comment.set(commentData);
        await comment.save();
        return comment;
    } catch (error) {
        console.log("Error creating Comment", error)
    }
}

const updateCommentDAL = async (commentForm, comment_id) => {
    try {
        const comment = await models.Comment.where({
            'id': comment_id
        }).fetch({
            withRelated: ['user','products']
        });
        const {...commentData} = commentForm.data;
        console.log(comment);
        comment.set(commentData);
        await comment.save();
        return comment;
    } catch (error) {
        console.log("Error updating Comment", error)
    }
}

const deleteCommentDAL = async (comment_id) => {
    try {
        const comment = await models.Comment.where({
            'id': comment_id
        }).fetch();
        await comment.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting Comment", error)
    }
}

module.exports = {
    getAllCommentsDAL,
    getCommentDAL,
    addCommentDAL,
    updateCommentDAL,
    deleteCommentDAL
}