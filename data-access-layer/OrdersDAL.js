const models = require("../models");

const getAllOrdersDAL = async () => {
    try {
        return await models.Order.fetchAll({
            withRelated: ['status','order_items']
        });
    } catch (error) {
        console.log("Error getting Orders", error)
    }
}

const getOrderDAL = async (order_id) => {
    try {
        return await models.Order.where({
            'id': order_id
        }).fetch({
            withRelated: ['status','order_items']
        });
    } catch (error) {
        console.log("Error getting Order", error)
    }
}

const addOrderDAL = async (orderForm) => {
    try {
        const order = new models.Order();
        const {...orderData} = orderForm.data;
        order.set(orderData);
        await order.save();
        return order;
    } catch (error) {
        console.log("Error creating Order", error)
    }
}

const updateOrderDAL = async (orderForm, order_id) => {
    try {
        const order = await models.Order.where({
            'id': order_id
        }).fetch({
            withRelated: ['status','order_items']
        });
        const {...orderData} = orderForm.data;
        order.set(orderData);
        await order.save();
        return order;
    } catch (error) {
        console.log("Error updating Order", error)
    }
}

const deleteOrderDAL = async (order_id) => {
    try {
        const order = await models.Order.where({
            'id': order_id
        }).fetch();
        await order.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting Order", error)
    }
}

module.exports = {
    getAllOrdersDAL,
    getOrderDAL,
    addOrderDAL,
    updateOrderDAL,
    deleteOrderDAL
}