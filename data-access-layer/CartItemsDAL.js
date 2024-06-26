const models = require("../models");

const getAllCartItemsDAL = async () => {
  try {
    return await models.Cart_Item.fetchAll({
      withRelated: ["user", "product"],
    });
  } catch (error) {
    console.log("Error getting Cart Items", error);
  }
};

const getCartItemDAL = async (cartitem_id) => {
  try {
    return await models.Cart_Item.where({
      id: cartitem_id,
    }).fetch({
      withRelated: ["user", "product"],
    });
  } catch (error) {
    console.log("Error getting Cart Item", error);
  }
};

const addCartItemDAL = async (cartitemForm) => {
  try {
    const cartitem = new models.Cart_Item();
    const { ...cartitemData } = cartitemForm.data;
    cartitem.set(cartitemData);
    await cartitem.save();
    return cartitem.fetch({
      withRelated: ["product"],
    });
  } catch (error) {
    console.log("Error creating Cart Item", error);
    return null;
  }
};

const updateCartItemDAL = async (cartitemForm, cartitem_id) => {
  try {
    const cartitem = await models.Cart_Item.where({
      id: cartitem_id,
    }).fetch({
      required: true,
    });
    const { ...cartitemData } = cartitemForm.data;
    cartitem.set(cartitemData);
    await cartitem.save();
    return cartitem.fetch({
      withRelated: ["product"],
    });
  } catch (error) {
    console.log("Error updating Cart Item", error);
  }
};

const deleteCartItemDAL = async (cartitem_id) => {
  try {
    const cartitem = await models.Cart_Item.where({
      id: cartitem_id,
    }).fetch({
      required: true,
    });
    await cartitem.destroy();
    return true;
  } catch (error) {
    console.log("Error Deleting Cart Item", error);
  }
};

const getUserCartItemsDAL = async (user_id) => {
  try {
    return await models.Cart_Item.where({
      user_id: user_id,
    }).fetchAll({
      withRelated: ["product"],
    });
  } catch (error) {
    console.log("Error getting Cart Items", error);
    return null;
  }
};

const clearUserCartDAL = async (user_id) => {
  try {
    const cartitems = await models.Cart_Item.where({
      user_id: user_id,
    }).fetchAll({
      withRelated: ["product"],
    });
    for (let item of cartitems) await item.destroy();
    return true;
  } catch (error) {
    console.log("Error Deleting Cart Items", error);
  }
};

module.exports = {
  getAllCartItemsDAL,
  getCartItemDAL,
  addCartItemDAL,
  updateCartItemDAL,
  deleteCartItemDAL,
  getUserCartItemsDAL,
  clearUserCartDAL,
};
