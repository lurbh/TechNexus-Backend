const express = require("express");
const router =  express.Router();

const productRoutes = require("./api/Product");
const userRoutes = require("./api/User")

router.get('/', function(req,res){
    res.status(200);
    res.json({
        "message":"API Success"
    })
});

router.use("/product" , productRoutes);
router.use("/user" , userRoutes);

module.exports = router;