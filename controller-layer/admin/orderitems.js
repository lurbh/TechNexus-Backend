const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/OrdersItems");
const { serviceGetAllProducts } = require("../../service-layer/Product");
const { serviceGetOrders } = require("../../service-layer/Orders");

router.get("/", async function (req, res) {
  const orderitems = await serviceLayer.serviceGetOrderItems();
  res.render("orderitems/index", {
    orderitems: orderitems.toJSON(),
  });
});

router.get("/add-order-item", async function (req, res) {
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allOrders = (await serviceGetOrders()).map((o) => [
    o.get("id"),
    o.get("id"),
  ]);
  const orderForm = modelforms.createOrderItemForm(allOrders, allProducts);
  res.render("orderitems/create", {
    form: orderForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-order-item", async function (req, res) {
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allOrders = (await serviceGetOrders()).map((o) => [
    o.get("id"),
    o.get("id"),
  ]);
  const orderForm = modelforms.createOrderItemForm(allOrders, allProducts);
  orderForm.handle(req, {
    success: async function (form) {
      const order = await serviceLayer.serviceAddOrderItem(form);
      req.flash("success_messages", `New Order Item has been created`);
      res.redirect("/admin/orderitems");
    },
    empty: function (form) {
      res.render("orderitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orderitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-order-item/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const orderitem = await serviceLayer.serviceGetOrderItem(order_id);
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allOrders = (await serviceGetOrders()).map((o) => [
    o.get("id"),
    o.get("id"),
  ]);
  const orderForm = modelforms.createOrderItemForm(allOrders, allProducts);
  for (let field in orderForm.fields) {
    orderForm.fields[field].value = orderitem.get(field);
  }
  res.render("orderitems/update", {
    form: orderForm.toHTML(modelforms.bootstrapField),
    orderitem: orderitem.toJSON(),
  });
});

router.post("/update-order-item/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const allProducts = (await serviceGetAllProducts()).map((p) => [
    p.get("id"),
    p.get("product_name"),
  ]);
  const allOrders = (await serviceGetOrders()).map((o) => [
    o.get("id"),
    o.get("id"),
  ]);
  const orderForm = modelforms.createOrderItemForm(allOrders, allProducts);
  orderForm.handle(req, {
    success: async function (form) {
      const order = await serviceLayer.serviceUpdateOrderItem(form, order_id);
      req.flash("success_messages", `Order Item has been updated`);
      res.redirect("/admin/orderitems");
    },
    empty: function (form) {
      res.render("orderitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orderitems/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/delete-order-item/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const orderitem = await serviceLayer.serviceGetOrderItem(order_id);

  res.render("orderitems/delete", {
    orderitem: orderitem.toJSON(),
  });
});

router.post("/delete-order-item/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const response = await serviceLayer.serviceDelOrderItem(order_id);
  req.flash("success_messages", `Order Item for has been Deleted`);
  res.redirect("/admin/orderitems");
});

module.exports = router;
