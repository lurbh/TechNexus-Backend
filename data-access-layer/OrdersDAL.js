const models = require("../models");

const getAllOrdersDAL = async () => {
    try {
        return await models.Order.fetchAll({
            withRelated: ['order_status','user']
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
            require: true
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
            require: true
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
        }).fetch({
            require: true
        });
        await order.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting Order", error)
    }
}

const createNewOrderDAL = async (user_id) => {
    try {
        const order = new models.Order();
        order.set({
            user_id: user_id,
            order_status_id: 1,
        });
        await order.save();
        return order;
    } catch (error) {
        console.log("Error creating Order", error)
    }
}

const getOrdersForUserDAL = async (user_id) => {
    try {
        return await models.Order.where({
            'user_id': user_id
        }).fetchAll({
            withRelated: ['order_items.product', 'order_status']
        });
    } catch (error) {
        console.log("Error getting Order", error)
    }
}

module.exports = {
    getAllOrdersDAL,
    getOrderDAL,
    addOrderDAL,
    updateOrderDAL,
    deleteOrderDAL,
    createNewOrderDAL,
    getOrdersForUserDAL
}