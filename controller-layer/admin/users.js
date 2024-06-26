const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const models = require("../../models");
const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/Users");

const { checkIfAuthenticated, getHashedPassword } = require("../../middleware");

router.get("/", checkIfAuthenticated, async function (req, res) {
  const users = await serviceLayer.serviceGetAllUsers();
  res.render("users/index", {
    users: users.toJSON(),
  });
});

router.get("/add-user", checkIfAuthenticated, async function (req, res) {
  const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
    role.get("id"),
    role.get("role_name"),
  ]);
  const userForm = modelforms.createUserForm(roles);
  res.render("users/create", {
    form: userForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-user", checkIfAuthenticated, async function (req, res) {
  const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
    role.get("id"),
    role.get("role_name"),
  ]);
  const userForm = modelforms.createUserForm(roles);
  userForm.handle(req, {
    success: async function (form) {
      form.data.password = getHashedPassword(form.data.password);
      form.data.confirm_password = getHashedPassword(
        form.data.confirm_password,
      );
      const user = await serviceLayer.serviceAddUser(form);
      req.flash(
        "success_messages",
        `New User ${user.get("username")} has been created`,
      );
      res.redirect("/admin/users");
    },
    empty: function (form) {
      res.render("users/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("users/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get(
  "/update-user/:user_id",
  checkIfAuthenticated,
  async function (req, res) {
    const { user_id } = req.params;
    const user = await serviceLayer.serviceGetUser(user_id);
    const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
      role.get("id"),
      role.get("role_name"),
    ]);
    const userForm = modelforms.createUserForm(roles);
    for (let field in userForm.fields) {
      userForm.fields[field].value = user.get(field);
    }
    res.render("users/update", {
      form: userForm.toHTML(modelforms.bootstrapField),
    });
  },
);

router.post(
  "/update-user/:user_id",
  checkIfAuthenticated,
  async function (req, res) {
    const { user_id } = req.params;
    const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
      role.get("id"),
      role.get("role_name"),
    ]);
    const userForm = modelforms.createUserForm(roles);
    userForm.handle(req, {
      success: async function (form) {
        form.data.password = getHashedPassword(form.data.password);
        form.data.confirm_password = getHashedPassword(
          form.data.confirm_password,
        );
        const user = await serviceLayer.serviceUpdateUser(form, user_id);
        req.flash(
          "success_messages",
          `User ${user.get("username")} has been updated`,
        );
        res.redirect("/admin/users");
      },
      empty: function (form) {
        res.render("users/update", {
          form: form.toHTML(modelforms.bootstrapField),
        });
      },
      error: function (form) {
        res.render("users/update", {
          form: form.toHTML(modelforms.bootstrapField),
        });
      },
    });
  },
);

router.get("/delete-user/:user_id", async function (req, res) {
  const { user_id } = req.params;
  const user = await serviceLayer.serviceGetUser(user_id);

  res.render("users/delete", {
    user: user.toJSON(),
  });
});

router.post("/delete-user/:user_id", async function (req, res) {
  const { user_id } = req.params;
  const response = await serviceLayer.serviceDeleteUser(user_id);
  req.flash("success_messages", `User ${response} has been Deleted`);
  res.redirect("/admin/users");
});

router.get("/register", async function (req, res) {
  const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
    role.get("id"),
    role.get("role_name"),
  ]);
  const registerForm = modelforms.createUserForm(roles);
  res.render("users/register", {
    form: registerForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/register", async (req, res) => {
  const roles = (await serviceLayer.serviceGetAllRoles()).map((role) => [
    role.get("id"),
    role.get("role_name"),
  ]);
  const registerForm = modelforms.createUserForm(roles);
  registerForm.handle(req, {
    success: async (form) => {
      form.data.password = getHashedPassword(form.data.password);
      form.data.confirm_password = getHashedPassword(
        form.data.confirm_password,
      );
      const user = await serviceLayer.serviceAddUser(form);
      req.flash("success_messages", "User signed up successfully!");
      res.redirect("/admin/users/login");
    },
    empty: (form) => {
      res.render("users/register", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: (form) => {
      res.render("users/register", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/login", (req, res) => {
  const loginForm = modelforms.createLoginForm();
  res.render("users/login", {
    form: loginForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/login", (req, res) => {
  const loginForm = modelforms.createLoginForm();
  loginForm.handle(req, {
    success: async (form) => {
      const user = await serviceLayer.serviceGetUserLogin(form.data.email);
      if (!user) {
        req.flash(
          "error_messages",
          "Sorry, the authentication details you provided does not work.",
        );
        res.redirect("/admin/users/login");
      } else {
        if (
          user.get("password_hash") === getHashedPassword(form.data.password)
        ) {
          req.session.user = {
            id: user.get("id"),
            username: user.get("username"),
            email: user.get("email"),
            role: user.get("role_id"),
          };
          req.flash(
            "success_messages",
            "Welcome back, " + user.get("username"),
          );
          res.redirect("/admin");
        } else {
          req.flash(
            "error_messages",
            "Sorry, the authentication details you provided does not work.",
          );
          res.redirect("/admin/users/login");
        }
      }
    },
    error: (form) => {
      req.flash(
        "error_messages",
        "There are some problems logging you in. Please fill in the form again",
      );
      res.render("users/login", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/logout", checkIfAuthenticated, (req, res) => {
  req.session.user = null;
  req.flash("success_messages", "Goodbye");
  res.redirect("/admin/users/login");
});

module.exports = router;
