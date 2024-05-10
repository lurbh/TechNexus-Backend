const express = require("express");
const router = express.Router();

const serviceCartItems = require("../../service-layer/CartItems");
const { serviceGetAllProducts } = require("../../service-layer/Product");
const { serviceGetOnlyUserType } = require("../../service-layer/Users");
const { createCartItemForm } = require("../../forms");
const { servicegetRoleID } = require("../../service-layer/Roles")

const { verifyToken } = require("../../middleware");

router.get("/usercart/:user_id", verifyToken, async (req, res) => {
  const { user_id } = req.params;
  const cart_items = await serviceCartItems.serviceGetUserCartItems(user_id);
  if(cart_items)
    res.status(200).json({ cart_items: cart_items });
  else
    res.status(400).json({error: "Error getting Cart Items"})
});

router.post("/usercart", verifyToken, async (req, res) => {
  const allProducts = await serviceGetAllProducts();
  const role_id = await servicegetRoleID("user");
  const allUsers = await serviceGetOnlyUserType(role_id);
  const cartitemform = createCartItemForm(allUsers, allProducts);
  cartitemform.handle(req, {
    success: async function (form) {
      const cartitem = await serviceCartItems.serviceAddCartItem(form);
      if(cartitem)
        res.status(201).json({ message: cartitem });
      else
        res.status(400).json({error:"Error creating Cart Item"})
    },
    empty: function (form) {
      res.status(400).json({
        error: "Empty request recieved",
      });
    },
    error: function (form) {
      const errors = {};
      for (let key in form.fields) {
        if (form.fields[key].error) errors[key] = form.fields[key].error;
      }
      res.status(400).json({
        error: errors,
      });
    },
  });
});

router.put("/usercart/:cartitem_id", verifyToken, async (req, res) => {
  const { cartitem_id } = req.params;
  const allProducts = await serviceGetAllProducts();
  const role_id = await servicegetRoleID("user");
  const allUsers = await serviceGetOnlyUserType(role_id);
  const cartitemform = createCartItemForm(allUsers, allProducts);
  cartitemform.handle(req, {
    success: async function (form) {
      const cartitem = await serviceCartItems.serviceUpdateCartItem(
        form,
        cartitem_id,
      );
      if(cartitem)
        res.status(202).json({ message: cartitem });
      else
        res.status(400).json({error:"Error updating Cart Item"})
    },
    empty: function (form) {
      res.status(400).json({
        error: "Empty request recieved",
      });
    },
    error: function (form) {
      const errors = {};
      for (let key in form.fields) {
        if (form.fields[key].error) errors[key] = form.fields[key].error;
      }
      res.status(400).json({
        error: errors,
      });
    },
  });
});

router.delete("/usercart/:cartitem_id", verifyToken, async (req, res) => {
  const { cartitem_id } = req.params;
  const response = await serviceCartItems.serviceDelCartItem(cartitem_id);
  if(response)
    res.status(200).json({ message: response });
  else
    res.status(400).json({error:"Error deleting Cart Item"})
});

module.exports = router;
