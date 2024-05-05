const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/Comments");
const newsService = require("../../service-layer/NewsArticles");
const userService = require("../../service-layer/Users");

router.get("/", async function (req, res) {
  const comments = await serviceLayer.serviceGetComments();
  res.render("comments/index", {
    comments: comments.toJSON(),
  });
});

router.get("/add-comment", async function (req, res) {
  const allNewsArticles = (await newsService.serviceGetNewsArticles()).map(
    (news) => [news.get("id"), news.get("title")],
  );
  const allUser = (await userService.serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const commentForm = modelforms.createCommentForm(allNewsArticles, allUser);
  res.render("comments/create", {
    form: commentForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-comment", async function (req, res) {
  const allNewsArticles = (await newsService.serviceGetNewsArticles()).map(
    (news) => [news.get("id"), news.get("title")],
  );
  const allUser = (await userService.serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const commentForm = modelforms.createCommentForm(allNewsArticles, allUser);
  commentForm.handle(req, {
    success: async function (form) {
      const comment = await serviceLayer.serviceAddComment(form);
      req.flash(
        "success_messages",
        `New Comment ${comment.get("comment_name")} has been created`,
      );
      res.redirect("/admin/comments");
    },
    empty: function (form) {
      res.render("comments/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("comments/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-comment/:comment_id", async function (req, res) {
  const { comment_id } = req.params;
  const comment = await serviceLayer.serviceGetComment(comment_id);
  const allNewsArticles = (await newsService.serviceGetNewsArticles()).map(
    (news) => [news.get("id"), news.get("title")],
  );
  const allUser = (await userService.serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const commentForm = modelforms.createCommentForm(allNewsArticles, allUser);
  for (let field in commentForm.fields) {
    commentForm.fields[field].value = comment.get(field);
  }
  res.render("comments/update", {
    form: commentForm.toHTML(modelforms.bootstrapField),
    comment: comment.toJSON(),
  });
});

router.post("/update-comment/:comment_id", async function (req, res) {
  const { comment_id } = req.params;
  const allNewsArticles = (await newsService.serviceGetNewsArticles()).map(
    (news) => [news.get("id"), news.get("title")],
  );
  const allUser = (await userService.serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const commentForm = modelforms.createCommentForm(allNewsArticles, allUser);
  commentForm.handle(req, {
    success: async function (form) {
      const comment = await serviceLayer.serviceUpdateComment(form, comment_id);
      req.flash(
        "success_messages",
        `Comment ${comment.get("comment_name")} has been updated`,
      );
      res.redirect("/admin/comments");
    },
    empty: function (form) {
      res.render("comments/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("comments/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/delete-comment/:comment_id", async function (req, res) {
  const { comment_id } = req.params;
  const comment = await serviceLayer.serviceGetComment(comment_id);

  res.render("comments/delete", {
    comment: comment.toJSON(),
  });
});

router.post("/delete-comment/:comment_id", async function (req, res) {
  const { comment_id } = req.params;
  const response = await serviceLayer.serviceDelComment(comment_id);
  req.flash("success_messages", `Comment has been Deleted`);
  res.redirect("/admin/comments");
});

module.exports = router;
