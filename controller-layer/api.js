const express = require("express");
const router =  express.Router();

const productRoutes = require("./api/Product");

router.get('/', function(req,res){
    res.status(200);
    res.json({
        "message":"API Success"
    })
});

router.use("/products" , productRoutes);


module.exports = router;