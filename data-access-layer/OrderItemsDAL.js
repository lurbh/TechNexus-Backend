const models = require("../models");

const getAllOrderItemsDAL = async () => {
    try {
        return await models.Order_Item.fetchAll({
            withRelated: ['order','product']
        });
    } catch (error) {
        console.log("Error getting Order Items", error)
    }
}

const getOrderItemDAL = async (orderitem_id) => {
    try {
        return await models.Order_Item.where({
            'id': orderitem_id
        }).fetch({
            withRelated: ['order','product']
        });
    } catch (error) {
        console.log("Error getting Order Item", error)
    }
}

const addOrderItemDAL = async (orderitemForm) => {
    try {
        const orderitem = new models.Order_Item();
        const {...orderitemData} = orderitemForm.data;
        orderitem.set(orderitemData);
        await orderitem.save();
        return orderitem;
    } catch (error) {
        console.log("Error creating Order Item", error)
    }
}

const updateOrderItemDAL = async (orderitemForm, orderitem_id) => {
    try {
        const orderitem = await models.Order_Item.where({
            'id': orderitem_id
        }).fetch({
            required: true
        });
        const {...orderitemData} = orderitemForm.data;
        orderitem.set(orderitemData);
        await orderitem.save();
        return orderitem;
    } catch (error) {
        console.log("Error updating Order Item", error)
    }
}

const deleteOrderItemDAL = async (orderitem_id) => {
    try {
        const orderitem = await models.Order_Item.where({
            'id': orderitem_id
        }).fetch({
            required: true
        });
        await orderitem.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting OrderItem", error)
    }
}

module.exports = {
    getAllOrderItemsDAL,
    getOrderItemDAL,
    addOrderItemDAL,
    updateOrderItemDAL,
    deleteOrderItemDAL
}