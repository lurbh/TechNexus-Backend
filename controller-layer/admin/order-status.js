const express = require("express");
const router = express.Router();

const modelforms = require("../../forms");
const serviceLayer = require("../../service-layer/OrdersStatuses");

router.get("/", async function (req, res) {
  const orderStatuses = await serviceLayer.serviceGetOrderStatuses();
  res.render("orderstatuses/index", {
    orderStatuses: orderStatuses.toJSON(),
  });
});

router.get("/add-order-status", async function (req, res) {
  const orderStatusForm = modelforms.createOrderStatusForm();
  res.render("orderstatuses/create", {
    form: orderStatusForm.toHTML(modelforms.bootstrapField),
  });
});

router.post("/add-order-status", async function (req, res) {
  const orderStatusForm = modelforms.createOrderStatusForm();
  orderStatusForm.handle(req, {
    success: async function (form) {
      const orderStatus = await serviceLayer.serviceAddOrderStatus(form);
      req.flash(
        "success_messages",
        `New OrderStatus ${orderStatus.get("status_name")} has been created`,
      );
      res.redirect("/admin/orderstatus");
    },
    empty: function (form) {
      res.render("orderstatuses/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orderstatuses/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/update-order-status/:orderStatus_id", async function (req, res) {
  const { orderStatus_id } = req.params;
  const orderStatus = await serviceLayer.serviceGetOrderStatus(orderStatus_id);
  const orderStatusForm = modelforms.createOrderStatusForm();
  for (let field in orderStatusForm.fields) {
    orderStatusForm.fields[field].value = orderStatus.get(field);
  }
  res.render("orderstatuses/update", {
    form: orderStatusForm.toHTML(modelforms.bootstrapField),
    orderStatus: orderStatus.toJSON(),
  });
});

router.post("/update-order-status/:orderStatus_id", async function (req, res) {
  const { orderStatus_id } = req.params;
  const orderStatusForm = modelforms.createOrderStatusForm();
  orderStatusForm.handle(req, {
    success: async function (form) {
      const orderStatus = await serviceLayer.serviceUpdateOrderStatus(
        form,
        orderStatus_id,
      );
      req.flash(
        "success_messages",
        `Order Status ${orderStatus.get("status_name")} has been updated`,
      );
      res.redirect("/admin/orderstatus");
    },
    empty: function (form) {
      res.render("orderstatuses/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
    error: function (form) {
      res.render("orderstatuses/create", {
        form: form.toHTML(modelforms.bootstrapField),
      });
    },
  });
});

router.get("/delete-order-status/:orderStatus_id", async function (req, res) {
  const { orderStatus_id } = req.params;
  const orderStatus = await serviceLayer.serviceGetOrderStatus(orderStatus_id);

  res.render("orderstatuses/delete", {
    orderStatus: orderStatus.toJSON(),
  });
});

router.post("/delete-order-status/:orderStatus_id", async function (req, res) {
  const { orderStatus_id } = req.params;
  const response = await serviceLayer.serviceDelOrderStatus(orderStatus_id);
  req.flash("success_messages", `Order Status ${response} has been Deleted`);
  res.redirect("/admin/orderstatus");
});

module.exports = router;
