const express = require("express");
const router =  express.Router();

const productRoutes = require("./api/Product");
const userRoutes = require("./api/User");
const cartRoutes = require("./api/Cart");
const checkoutRoutes = require("./api/Checkout");

router.get('/', function(req,res){
    res.status(200);
    res.json({
        "message":"API Success"
    })
});

router.use("/products" , productRoutes);
router.use("/user" , userRoutes);
router.use("/cart" , cartRoutes);
router.use("/checkout", checkoutRoutes); 

module.exports = router;