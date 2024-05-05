const orderDAL = require("../data-access-layer/OrdersDAL");

const serviceGetOrders = async () => {
  const orders = await orderDAL.getAllOrdersDAL();
  return orders;
};

const serviceGetOrder = async (order_id) => {
  const order = await orderDAL.getOrderDAL(order_id);
  return order;
};

const serviceAddOrder = async (orderForm) => {
  const response = await orderDAL.addOrderDAL(orderForm);
  return response;
};

const serviceUpdateOrder = async (orderForm, order_id) => {
  const response = await orderDAL.updateOrderDAL(orderForm, order_id);
  return response;
};

const serviceDelOrder = async (order_id) => {
  const response = await orderDAL.deleteOrderDAL(order_id);
  return response;
};

const serviceCreateNewOrder = async (user_id) => {
  const response = await orderDAL.createNewOrderDAL(user_id);
  return response;
};

const servicegetOrdersForUser = async (user_id) => {
  const response = await orderDAL.getOrdersForUserDAL(user_id);
  return response;
};

const servicePaymentCompleted = async (order_id) => {
  const response = await orderDAL.paymentCompletedDAL(order_id);
  return response;
};

module.exports = {
  serviceGetOrders,
  serviceGetOrder,
  serviceAddOrder,
  serviceUpdateOrder,
  serviceDelOrder,
  serviceCreateNewOrder,
  servicegetOrdersForUser,
  servicePaymentCompleted,
};
