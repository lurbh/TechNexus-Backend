const orderitemDAL = require("../data-access-layer/OrderItemsDAL");

const serviceGetOrderItems = async () => {
    const orderitems = await orderitemDAL.getAllOrderItemsDAL();
    return orderitems;
} 

const serviceGetOrderItem = async (orderitem_id) => {
    const orderitem =  await orderitemDAL.getOrderItemDAL(orderitem_id);
    return orderitem;
} 

const serviceAddOrderItem = async (orderitemForm) => {
    const response = await orderitemDAL.addOrderItemDAL(orderitemForm);
    return response;
} 

const serviceUpdateOrderItem = async (orderitemForm, orderitem_id) => {
    const response = await orderitemDAL.updateOrderItemDAL(orderitemForm, orderitem_id);
    return response;
} 

const serviceDelOrderItem = async (orderitem_id) => {
    const response = await orderitemDAL.deleteOrderItemDAL(orderitem_id);
    return response;
} 

module.exports = {
    serviceGetOrderItems,
    serviceGetOrderItem,
    serviceAddOrderItem,
    serviceUpdateOrderItem,
    serviceDelOrderItem
}