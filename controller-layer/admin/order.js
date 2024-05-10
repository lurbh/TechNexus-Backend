const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/Orders");
const orderStatusService = require("../../service-layer/OrdersStatuses");
const { serviceGetOnlyUserType } = require("../../service-layer/Users");
const { servicegetRoleID } = require("../../service-layer/Roles")

router.get("/", async function (req, res) {
  const orders = await serviceLayer.serviceGetOrders();
  res.render("orders/index", {
    orders: orders.toJSON(),
  });
});

router.get("/add-order", async function (req, res) {
    const role_id = await servicegetRoleID("user");
    const allUser = (await serviceGetOnlyUserType(role_id)).map((user) => [
        user.get("id"),
        user.get("username"),
    ]);
  const allOrderStatus = (
    await orderStatusService.serviceGetOrderStatuses()
  ).map((status) => [status.get("id"), status.get("status_name")]);
  const orderForm = modelforms.createOrderForm(allUser, allOrderStatus);
  res.render("orders/create", {
    form: orderForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-order", async function (req, res) {
    const role_id = await servicegetRoleID("user");
    const allUser = (await serviceGetOnlyUserType(role_id)).map((user) => [
        user.get("id"),
        user.get("username"),
    ]);
  const allOrderStatus = (
    await orderStatusService.serviceGetOrderStatuses()
  ).map((status) => [status.get("id"), status.get("status_name")]);
  const orderForm = modelforms.createOrderForm(allUser, allOrderStatus);
  orderForm.handle(req, {
    success: async function (form) {
      if (form.data.parent_order_id === 0) delete form.data.parent_order_id;
      const order = await serviceLayer.serviceAddOrder(form);
      req.flash("success_messages", `New Order for has been created`);
      res.redirect("/admin/orders");
    },
    empty: function (form) {
      res.render("orders/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orders/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-order/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const order = await serviceLayer.serviceGetOrder(order_id);
  const role_id = await servicegetRoleID("user");
    const allUser = (await serviceGetOnlyUserType(role_id)).map((user) => [
        user.get("id"),
        user.get("username"),
    ]);
  const allOrderStatus = (
    await orderStatusService.serviceGetOrderStatuses()
  ).map((status) => [status.get("id"), status.get("status_name")]);
  const orderForm = modelforms.createOrderForm(allUser, allOrderStatus);
  for (let field in orderForm.fields) {
    orderForm.fields[field].value = order.get(field);
  }
  res.render("orders/update", {
    form: orderForm.toHTML(modelforms.bootstrapField),
    order: order.toJSON(),
  });
});

router.post("/update-order/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const role_id = await servicegetRoleID("user");
    const allUser = (await serviceGetOnlyUserType(role_id)).map((user) => [
        user.get("id"),
        user.get("username"),
    ]);
  const allOrderStatus = (
    await orderStatusService.serviceGetOrderStatuses()
  ).map((status) => [status.get("id"), status.get("status_name")]);
  const orderForm = modelforms.createOrderForm(allUser, allOrderStatus);
  orderForm.handle(req, {
    success: async function (form) {
      if (form.data.parent_order_id === 0) delete form.data.parent_order_id;
      const order = await serviceLayer.serviceUpdateOrder(form, order_id);
      req.flash("success_messages", `Order has been updated`);
      res.redirect("/admin/orders");
    },
    empty: function (form) {
      res.render("orders/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orders/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/delete-order/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const order = await serviceLayer.serviceGetOrder(order_id);

  res.render("orders/delete", {
    order: order.toJSON(),
  });
});

router.post("/delete-order/:order_id", async function (req, res) {
  const { order_id } = req.params;
  const response = await serviceLayer.serviceDelOrder(order_id);
  req.flash("success_messages", `Order has been Deleted`);
  res.redirect("/admin/orders");
});

module.exports = router;
