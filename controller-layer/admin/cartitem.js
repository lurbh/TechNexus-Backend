const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/CartItems");
const { serviceGetAllProducts } = require("../../service-layer/Product");
const { serviceGetOnlyUserType } = require("../../service-layer/Users");

router.get("/", async function (req, res) {
  const cartitems = await serviceLayer.serviceGetCartItems();
  res.render("cartitems/index", {
    cartitems: cartitems.toJSON(),
  });
});

router.get("/add-cart-item", async function (req, res) {
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allUsers = (await serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const cartitemform = modelforms.createCartItemForm(allUsers, allProducts);
  res.render("cartitems/create", {
    form: cartitemform.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-cart-item", async function (req, res) {
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allUsers = (await serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const cartitemform = modelforms.createCartItemForm(allUsers, allProducts);
  cartitemform.handle(req, {
    success: async function (form) {
      const cartitem = await serviceLayer.serviceAddCartItem(form);
      req.flash("success_messages", `New Cart Item has been created`);
      res.redirect("/admin/cartitems");
    },
    empty: function (form) {
      res.render("cartitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("cartitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-cart-item/:cartitem_id", async function (req, res) {
  const { cartitem_id } = req.params;
  const cartitem = await serviceLayer.serviceGetCartItem(cartitem_id);
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allUsers = (await serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const cartitemform = modelforms.createCartItemForm(allUsers, allProducts);
  for (let field in cartitemform.fields) {
    cartitemform.fields[field].value = cartitem.get(field);
  }
  res.render("cartitems/update", {
    form: cartitemform.toHTML(modelforms.bootstrapField),
    cartitem: cartitem.toJSON(),
  });
});

router.post("/update-cart-item/:cartitem_id", async function (req, res) {
  const { cartitem_id } = req.params;
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allUsers = (await serviceGetOnlyUserType(2)).map((user) => [
    user.get("id"),
    user.get("username"),
  ]);
  const cartitemform = modelforms.createCartItemForm(allUsers, allProducts);
  cartitemform.handle(req, {
    success: async function (form) {
      const cartitem = await serviceLayer.serviceUpdateCartItem(
        form,
        cartitem_id,
      );
      req.flash("success_messages", `Cart Item has been updated`);
      res.redirect("/admin/cartitems");
    },
    empty: function (form) {
      res.render("cartitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("cartitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/delete-cart-item/:cartitem_id", async function (req, res) {
  const { cartitem_id } = req.params;
  const cartitem = await serviceLayer.serviceGetCartItem(cartitem_id);

  res.render("cartitems/delete", {
    cartitem: cartitem.toJSON(),
  });
});

router.post("/delete-cart-item/:cartitem_id", async function (req, res) {
  const { cartitem_id } = req.params;
  const response = await serviceLayer.serviceDelCartItem(cartitem_id);
  req.flash("success_messages", `Cart Item for has been Deleted`);
  res.redirect("/admin/cartitems");
});

module.exports = router;
