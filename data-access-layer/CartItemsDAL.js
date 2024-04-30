const models = require("../models");

const getAllCartItemsDAL = async () => {
    try {
        return await models.Cart_Item.fetchAll({
            withRelated: ['user','product']
        });
    } catch (error) {
        console.log("Error getting Cart Items", error)
    }
}

const getCartItemDAL = async (cartitem_id) => {
    try {
        return await models.Cart_Item.where({
            'id': cartitem_id
        }).fetch({
            withRelated: ['user','product']
        });
    } catch (error) {
        console.log("Error getting Cart Item", error)
    }
}

const addCartItemDAL = async (cartitemForm) => {
    try {
        const cartitem = new models.Cart_Item();
        const {...cartitemData} = cartitemForm.data;
        cartitem.set(cartitemData);
        await cartitem.save();
        return cartitem;
    } catch (error) {
        console.log("Error creating Cart Item", error)
    }
}

const updateCartItemDAL = async (cartitemForm, cartitem_id) => {
    try {
        const cartitem = await models.Cart_Item.where({
            'id': cartitem_id
        }).fetch({
            required: true
        });
        const {...cartitemData} = cartitemForm.data;
        cartitem.set(cartitemData);
        await cartitem.save();
        return cartitem;
    } catch (error) {
        console.log("Error updating Cart Item", error)
    }
}

const deleteCartItemDAL = async (cartitem_id) => {
    try {
        const cartitem = await models.Cart_Item.where({
            'id': cartitem_id
        }).fetch({
            required: true
        });
        await cartitem.destroy();
        return;
    } catch (error) {
        console.log("Error Deleting Cart Item", error)
    }
}

const getUserCartItemsDAL = async (user_id) => {
    try {
        return await models.Cart_Item.where({
            'user_id': user_id
        }).fetchAll({
            withRelated: ['product']
        });
    } catch (error) {
        console.log("Error getting Cart Item", error)
    }
}

const sumCartItemsDAL = async (user_id) => {
    try {
        const cartitems = await models.Cart_Item.where({
            'user_id': user_id
        }).fetchAll({
            withRelated: ['user','product']
        });
        console.log(cartitems);
        return cartitems;
        // }).query().sum('price as TotalPrice').then(result => {
        //     console.log(result[0]);
        //     const totalPrice = result[0].TotalPrice || 0;
        //     console.log('Total Price:', totalPrice);
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
    } catch (error) {
        
    }
}


module.exports = {
    getAllCartItemsDAL,
    getCartItemDAL,
    addCartItemDAL,
    updateCartItemDAL,
    deleteCartItemDAL,
    getUserCartItemsDAL,
    sumCartItemsDAL
}