const express = require("express");
const router =  express.Router();

const serviceCartItems = require("../../service-layer/CartItems");
const { serviceGetAllProducts } = require("../../service-layer/Product");
const { serviceGetOnlyUserType } = require("../../service-layer/Users");
const { createCartItemForm } = require("../../forms")

const { verifyToken } = require("../../middleware");

router.get("/usercart/:user_id", verifyToken , async (req,res) => {
    const { user_id } = req.params
    const cart_items = await serviceCartItems.serviceGetUserCartItems(user_id);
    res.status(200).json({"cart_items":cart_items});
});

router.post("/usercart", verifyToken , async (req,res) => {
    const allProducts = await serviceGetAllProducts();
    const allUsers = await serviceGetOnlyUserType(2);
    const cartitemform = createCartItemForm(allUsers,allProducts);
    cartitemform.handle(req, {
        'success': async function(form) {
            const cartitem = await serviceCartItems.serviceAddCartItem(form);
            res.status(201).json({"message":cartitem});
        },
        'empty': function(form) {
            res.status(400).json({
                'error': 'Empty request recieved'
            })
        },
        'error': function(form) {
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

router.put("/usercart/:cartitem_id", verifyToken , async (req,res) => {
    const { cartitem_id } = req.params;
    const allProducts = await serviceGetAllProducts();
    const allUsers = await serviceGetOnlyUserType(2);
    const cartitemform = createCartItemForm(allUsers,allProducts);
    cartitemform.handle(req, {
        'success': async function(form) {
            const cartitem = await serviceCartItems.serviceUpdateCartItem(form, cartitem_id);
            res.status(201).json({"message":cartitem});
        },
        'empty': function(form) {
            res.status(400).json({
                'error': 'Empty request recieved'
            })
        },
        'error': function(form) {
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

router.delete("/usercart/:cartitem_id", verifyToken , async (req,res) => {
    const { cartitem_id }  = req.params;
    const response = await serviceCartItems.serviceDelCartItem(cartitem_id)
    res.status(200).json({"message":response});
})

module.exports = router;