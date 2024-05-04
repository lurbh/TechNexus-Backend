const express = require("express");
const router =  express.Router();

const { verifyToken } = require("../../middleware");

const serviceOrders = require("../../service-layer/Orders");

router.get("/:user_id", verifyToken , async (req,res) => {
    const { user_id } = req.params;
    const orders = await serviceOrders.servicegetOrdersForUser(user_id);
    res.status(200).json({"orders":orders})
})

router.put("payment/:order_id", verifyToken , async (req,res) => {
    console.log("Payment");
    const { order_id } = req.params;
    const orders = await serviceOrders.servicePaymentCompleted(order_id);
    res.status(200).json({"orders":orders})
})




module.exports = router;