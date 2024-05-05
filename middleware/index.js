const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const checkIfAuthenticated = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role == 1) next();
    else {
      req.session.user = null;
      req.flash(
        "error_messages",
        "You need to sign in as a admin to access this page",
      );
      res.redirect("/admin/users/login");
    }
  } else {
    req.flash("error_messages", "You need to sign in to access this page");
    res.redirect("/admin/users/login");
  }
};

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

const generateAccessToken = (user, tokenSecret, expiry) => {
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
      email: user.email,
      role: user.role_id,
    },
    tokenSecret,
    {
      expiresIn: expiry,
    },
  );
};

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, payload) {
      if (err) {
        return res.status(498).json({
          error: "Token Expired",
        });
      } else {
        req.payload = payload;
        next();
      }
    });
  } else {
    return res.status(400).json({
      error: "Login required to access this route",
    });
  }
}

module.exports = {
  checkIfAuthenticated,
  getHashedPassword,
  generateAccessToken,
  verifyToken,
};
