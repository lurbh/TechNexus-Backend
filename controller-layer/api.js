const express = require("express");
const router =  express.Router();

const productRoutes = require("./api/Product");
const userRoutes = require("./api/User");
const cartRoutes = require("./api/Cart");
const checkoutRoutes = require("./api/Checkout");
const orderRoutes = require("./api/Orders");

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
router.use("/orders", orderRoutes); 

module.exports = router;