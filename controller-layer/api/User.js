const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const serviceLayer = require("../../service-layer/Users");
const { createUserForm, createLoginForm } = require("../../forms");
const {
  getHashedPassword,
  generateAccessToken,
  verifyJWTToken,
} = require("../../middleware");
const BlacklistedDAL = require("../../data-access-layer/BlacklistDAL");

router.post("/register", async (req, res) => {
  const roles = await serviceLayer.serviceGetAllRoles();
  const registerForm = createUserForm(roles);
  registerForm.handle(req, {
    success: async (form) => {
      form.data.password = getHashedPassword(form.data.password);
      form.data.confirm_password = getHashedPassword(
        form.data.confirm_password,
      );
      const user = await serviceLayer.serviceAddUser(form);
      res.status(201).json({ message: user });
    },
    empty: (form) => {
      res.status(400).json({
        error: "Empty request recieved",
      });
    },
    error: (form) => {
      const errors = {};
      for (let key in form.fields) {
        if (form.fields[key].error) errors[key] = form.fields[key].error;
      }
      res.status(400).json({
        error: errors,
      });
    },
  });
});

router.post("/login", async function (req, res) {
  const loginForm = createLoginForm();
  loginForm.handle(req, {
    success: async (form) => {
      const user = await serviceLayer.serviceGetUserLogin(form.data.email);
      if (
        user &&
        user.get("password_hash") === getHashedPassword(form.data.password)
      ) {
        const accessToken = generateAccessToken(
          user,
          process.env.ACCESS_TOKEN_SECRET,
          "1h",
        );
        const refreshToken = generateAccessToken(
          user,
          process.env.REFRESH_TOKEN_SECRET,
          "1d",
        );
        res.status(200).json({
          accessToken,
          refreshToken,
          user: {
            username: user.get("username"),
            email: user.get("email"),
            role_id: user.get("role_id"),
            user_id: user.get("id"),
          },
        });
      } else {
        res.status(498).json({
          error: "The authentication details you provided does not work.",
        });
      }
    },
    error: (form) => {
      res.status(498).json({
        error: "The authentication details you provided does not work.",
      });
    },
  });
});

router.post("/refresh", async function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async function (err, user) {
        if (err) {
          return res.status(401).json({
            error: "Invalid refresh token",
          });
        }
        const blacklistedToken =
          await BlacklistedDAL.getBlackListToken(refreshToken);
        if (blacklistedToken) {
          return res.status(401).json({
            error: "Blacklisted refresh token",
          });
        }
        const accessToken = generateAccessToken(
          user,
          process.env.ACCESS_TOKEN_SECRET,
          "1h",
        );
        res.status(200).json({
          accessToken,
        });
      },
    );
  } else {
    res.status(400).json({
      error: "No Refresh Token Given",
    });
  }
});

router.post("/logout", async function (req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async function (err, user) {
        if (err) {
          return res.status(401).json({
            error: "Invalid refresh token",
          });
        }
        const token = await BlacklistedDAL.addBlackListTokenDAL(refreshToken);
        res.status(200).json({
          message: "Logged out successfully",
        });
      },
    );
  } else {
    res.status(400);
  }
});

module.exports = router;
