const models = require("../models");

const getAllOrderStatusesDAL = async () => {
  try {
    return await models.Order_Status.fetchAll();
  } catch (error) {
    console.log("Error getting Order Statuses", error);
  }
};

const getOrderStatusDAL = async (order_id) => {
  try {
    return await models.Order_Status.where({
      id: order_id,
    }).fetch();
  } catch (error) {
    console.log("Error getting Order Status", error);
  }
};

const addOrderStatusDAL = async (orderForm) => {
  try {
    const order = new models.Order_Status();
    const { ...orderData } = orderForm.data;
    order.set(orderData);
    await order.save();
    return order;
  } catch (error) {
    console.log("Error creating Order Status", error);
  }
};

const updateOrderStatusDAL = async (orderForm, order_id) => {
  try {
    const order = await models.Order_Status.where({
      id: order_id,
    }).fetch();
    const { ...orderData } = orderForm.data;
    order.set(orderData);
    await order.save();
    return order;
  } catch (error) {
    console.log("Error updating Order Status", error);
  }
};

const deleteOrderStatusDAL = async (order_id) => {
  try {
    const order = await models.Order_Status.where({
      id: order_id,
    }).fetch();
    const name = order.get("status_name");
    await order.destroy();
    return name;
  } catch (error) {
    console.log("Error Deleting Order Status", error);
  }
};

module.exports = {
  getAllOrderStatusesDAL,
  getOrderStatusDAL,
  addOrderStatusDAL,
  updateOrderStatusDAL,
  deleteOrderStatusDAL,
};
