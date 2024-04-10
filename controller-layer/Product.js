const express = require("express");
const router =  express.Router();

const { serviceGetAllProducts, serviceAddProduct, serviceEditProduct, serviceDeleteProduct, serviceGetProduct, serviceSearchProduct } = require("../service-layer/Product");

router.get("/", async (req,res) => {
    const products = await serviceGetAllProducts();
    res.status(200).json({"products":products});
});

router.get("/search", async (req,res) => {
    console.log("Control Search")
    const { product_name, category_id, brand_id } = req.query;
    console.log(product_name, category_id, brand_id);
    const products = await serviceSearchProduct(product_name, category_id, brand_id);
    res.status(200).json({"products":products});
});

router.get("/:product_id", async (req,res) => {
    const { product_id }  = req.params;
    const product = await serviceGetProduct(product_id);
    res.status(200).json({"product":product});
});

router.post("/", async (req,res) => {
    const { product_name, category_id, brand_id, description, price, quantity_available } = req.query;
    const response = await serviceAddProduct(product_name, category_id, brand_id, description, price, quantity_available);
    res.status(201).json({"message":response});
});

router.put("/:product_id", async (req,res) => {
    const { product_name, category_id, brand_id, description, price, quantity_available } = req.query;
    const { product_id }  = req.params;
    const response = await serviceEditProduct(product_name, category_id, brand_id, description, price, quantity_available,product_id);
    res.status(202).json({"message":response});
});

router.delete("/:product_id", async (req,res) => {
    const { product_id }  = req.params;
    const response = await serviceDeleteProduct(product_id)
    res.status(204).json({"message":response});
});



module.exports = router;