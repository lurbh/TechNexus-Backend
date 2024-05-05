const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary");
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async function (req, res) {
  res.status(200);
  res.json({
    message: "Success",
  });
});

router.get("/sign", async function (req, res) {
  const params = req.query.params_to_sign;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const signature = cloudinary.utils.api_sign_request(params, apiSecret);
  res.send(signature);
});

module.exports = router;

//https://7319-lurbh-technexusbackend-fkikxvtooya.ws-us110.gitpod.io/cloudinary/sign?params_to_sign[timestamp]=1713423020&params_to_sign[upload_preset]=TestTechNexus&params_to_sign[source]=uw
