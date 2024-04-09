const express = require("express");
const router =  express.Router();

const { servicegetAllProducts } = require("../service-layer/Product");

router.get("/", async (req,res) => {
    const products = await servicegetAllProducts();
    res.status(200).json({"products":(products)});
})

module.exports = router;