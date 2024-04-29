const express = require("express");
const router =  express.Router();

const serviceCartItems = require("../../service-layer/CartItems");

const { verifyToken } = require("../../middleware");

router.get("/usercart", verifyToken , async (req,res) => {
    const { user_id } = req.body
    const cart_items = serviceCartItems.serviceGetUserCartItems(user_id);
    res.status(200).json({"cart_items":cart_items});
});

router.post("addtoCart", verifyToken , async (req,res) => {
    const allProducts = await serviceGetAllProducts();
    const allUsers = await serviceGetOnlyUserType(2);
    const cartitemform = modelforms.createCartItemForm(allUsers,allProducts);
    cartitemform.handle(req, {
        'success': async function(form) {
            const cartitem = await serviceLayer.serviceAddCartItem(form);
            res.status(201).json({"message":cartitem});
        },
        'empty': function(form) {
            res.status(400).json({
                'error': 'Empty request recieved'
            })
        },
        'error': function(form) {
            console.log(form)
            const errors = {};
            for (let key in form.fields) {
                if(form.fields[key].error)
                    errors[key] = form.fields[key].error
            }
            res.status(400).json({
                'error': errors
            })
        }
    })
}) 

module.exports = router;