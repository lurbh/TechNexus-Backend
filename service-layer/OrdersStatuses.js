const orderStatusDAL = require("../data-access-layer/OrdersStatusDAL");

const serviceGetOrderStatuses = async () => {
  const orderStatuss = await orderStatusDAL.getAllOrderStatusesDAL();
  return orderStatuss;
};

const serviceGetOrderStatus = async (orderStatus_id) => {
  const orderStatus = await orderStatusDAL.getOrderStatusDAL(orderStatus_id);
  return orderStatus;
};

const serviceAddOrderStatus = async (orderStatusForm) => {
  const response = await orderStatusDAL.addOrderStatusDAL(orderStatusForm);
  return response;
};

const serviceUpdateOrderStatus = async (orderStatusForm, orderStatus_id) => {
  const response = await orderStatusDAL.updateOrderStatusDAL(
    orderStatusForm,
    orderStatus_id,
  );
  return response;
};

const serviceDelOrderStatus = async (orderStatus_id) => {
  const response = await orderStatusDAL.deleteOrderStatusDAL(orderStatus_id);
  return response;
};

module.exports = {
  serviceGetOrderStatuses,
  serviceGetOrderStatus,
  serviceAddOrderStatus,
  serviceUpdateOrderStatus,
  serviceDelOrderStatus,
};
