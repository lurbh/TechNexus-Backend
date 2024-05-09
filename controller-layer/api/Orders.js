const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middleware");

const serviceOrders = require("../../service-layer/Orders");

router.get("/:user_id", verifyToken, async (req, res) => {
  const { user_id } = req.params;
  const orders = await serviceOrders.servicegetOrdersForUser(user_id);
  if(orders)
    res.status(200).json({ orders: orders });
  else
    res.status(400).json({error:"Error Getting orders"})
});

router.put("/payment/:order_id", verifyToken, async (req, res) => {
  const { order_id } = req.params;
  const orders = await serviceOrders.servicePaymentCompleted(order_id);
  if(orders)
    res.status(200).json({ orders: orders });
  else
    res.status(400).json({error:"Error updating orders"})
});

module.exports = router;
