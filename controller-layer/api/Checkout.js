const express = require("express");
const bodyParser = require('body-parser')
const router = express.Router();

const { verifyToken } = require("../../middleware");

const serviceCartItems = require("../../service-layer/CartItems");
const serviceOrders = require("../../service-layer/Orders");
const serviceOrderItems = require("../../service-layer/OrdersItems");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", verifyToken, async (req, res) => {
  const { user_id } = req.body;
  const items = await serviceCartItems.serviceGetUserCartItems(user_id);
  const lineItems = [];
  for (let cartitem of items) {
    const lineitem = {
      quantity: cartitem.get("quantity"),
      price_data: {
        currency: "SGD",
        unit_amount: Math.round(cartitem.related("product").get("price") * 100),
        product_data: {
          name: cartitem.related("product").get("product_name"),
          metadata: {
            product_id: cartitem.get("product_id"),
            quantity: cartitem.get("quantity"),
          },
          images: [cartitem.related("product").get("image_url")],
        },
      },
    };
    lineItems.push(lineitem);
  }
  const order = await serviceOrders.serviceCreateNewOrder(user_id);
  const orderitems = await serviceOrderItems.serviceAddCartItemstoOrderItems(
    items,
    order.get("id"),
  );

  const payment = {
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: process.env.STRIPE_SUCCESS_URL + `/${order.get("id")}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    client_reference_id: order.get("id"),
    metadata: {
      user_id: user_id,
      order_id: order.get("id")
    },
  };
  console.log(payment);
  let stripeSession = await Stripe.checkout.sessions.create(payment);
  if (stripeSession.id) {
    const response = await serviceCartItems.serviceClearUserCartItems(user_id);
  } else {
    await serviceOrders.serviceDelOrder(order.get("id"));
  }

  res.status(200).json({ stripeURL: stripeSession.url });
});



module.exports = router;
