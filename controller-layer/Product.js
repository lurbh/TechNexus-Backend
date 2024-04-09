const express = require("express");
const router =  express.Router();

const { servicegetAllProducts, serviceaddProductDal } = require("../service-layer/Product");

router.get("/", async (req,res) => {
    const products = await servicegetAllProducts();
    res.status(200).json({"products":products});
})

router.post("/", async (req,res) => {
    const { product_name, category_id, brand_id, description, price, quantity_available } = req.params
    const response = await serviceaddProductDal(product_name, category_id, brand_id, description, price, quantity_available);
    res.status(201).json({"message":response});
})


module.exports = router;