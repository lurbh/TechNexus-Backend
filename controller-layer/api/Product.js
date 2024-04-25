const express = require("express");
const router =  express.Router();

const serviceProducts = require("../../service-layer/Product");
const { createProductForm } = require("../../forms");
const { verifyToken } = require("../../middleware")


router.get("/", async (req,res) => {
    const products = await serviceProducts.serviceGetAllProducts();
    res.status(200).json({"products":products});
});

router.get("/search", async (req,res) => {
    console.log("Control Search")
    const { product_name, category_id, brand_id } = req.body;
    console.log(product_name, category_id, brand_id);
    const products = await serviceProducts.serviceSearchProduct(product_name, category_id, brand_id);
    res.status(200).json({"products":products});
});

router.get("/search/:product_id", async (req,res) => {
    const { product_id }  = req.params;
    const product = await serviceProducts.serviceGetProduct(product_id);
    res.status(200).json({"product":product});
});

router.post("/", verifyToken ,  async (req,res) => {
    const allCategories = await serviceProducts.serviceGetAllCategories()
    const allBrands = await serviceProducts.serviceGetAllBrands();
    const productForm = createProductForm(allCategories, allBrands);
    productForm.handle(req, {
        'success': async function(form) {
            const product = await serviceProducts.serviceAddProduct(form);
            res.status(201).json({"message":product});
        },
        'empty': function(form) {
            res.status(400).json({
                'error': 'Empty request recieved'
            })
        },
        'error': function(form) {
            console.log(form)
            const errors = {};
            for (let key in form.fields) {
                if(form.fields[key].error)
                    errors[key] = form.fields[key].error
            }
            res.status(400).json({
                'error': errors
            })
        }
    })
    // const response = await serviceProducts.serviceAddProduct(product_name, category_id, brand_id, description, price, quantity_available);
    // res.status(201).json({"message":response});
});

router.put("/:product_id", verifyToken , async (req,res) => {
    const { product_id }  = req.params;
    const allCategories = await serviceProducts.serviceGetAllCategories()
    const allBrands = await serviceProducts.serviceGetAllBrands();
    const productForm = createProductForm(allCategories, allBrands);
    productForm.handle(req, {
        'success': async function(form) {
            const product = await serviceProducts.serviceEditProduct(form, product_id);
            res.status(202).json({"message":product});
        },
        'empty': function(form) {
            res.send(400);
            res.json({
                'error': 'Empty request recieved'
            })
        },
        'error': function(form) {
            const errors = {};
            for (let key in form.fields) {
                if(form.fields[key].error)
                    errors[key] = form.fields[key].error
            }
            res.send(400);
            res.json({
                'error': errors
            })
        }
    })
    // const response = await serviceProducts.serviceEditProduct(productForm,product_id);
    // res.status(202).json({"message":response});
});

router.delete("/:product_id", verifyToken, async (req,res) => {
    const { product_id }  = req.params;
    const response = await serviceProducts.serviceDeleteProduct(product_id)
    res.status(200).json({"message":response});
});

router.get("/categories", async (req,res) => {
    const categories = await serviceProducts.serviceGetMainCategories();
    res.status(200).json({"categories":categories});
});

router.get("/allcategories", async (req,res) => {
    const categories = await serviceProducts.serviceGetAllCategories();
    res.status(200).json({"categories":categories});
});

router.get("/brands", async (req,res) => {
    const brands = await serviceProducts.serviceGetAllBrands();
    res.status(200).json({"brands":brands});
});


module.exports = router;