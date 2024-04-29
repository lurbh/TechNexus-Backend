const res = require("express/lib/response");
const cartitemDAL = require("../data-access-layer/CartItemsDAL");

const serviceGetCartItems = async () => {
    const cartitems = await cartitemDAL.getAllCartItemsDAL();
    return cartitems;
} 

const serviceGetCartItem = async (cartitem_id) => {
    const cartitem =  await cartitemDAL.getCartItemDAL(cartitem_id);
    return cartitem;
} 

const serviceAddCartItem = async (cartitemForm) => {
    const response = await cartitemDAL.addCartItemDAL(cartitemForm);
    return response;
} 

const serviceUpdateCartItem = async (cartitemForm, cartitem_id) => {
    const response = await cartitemDAL.updateCartItemDAL(cartitemForm, cartitem_id);
    return response;
} 

const serviceDelCartItem = async (cartitem_id) => {
    const response = await cartitemDAL.deleteCartItemDAL(cartitem_id);
    return response;
} 

const serviceGetUserCartItems = async (user_id) => {
    const response = await cartitemDAL.getUserCartItemsDAL(user_id);
    return response;
}

module.exports = {
    serviceGetCartItems,
    serviceGetCartItem,
    serviceAddCartItem,
    serviceUpdateCartItem,
    serviceDelCartItem,
    serviceGetUserCartItems
}