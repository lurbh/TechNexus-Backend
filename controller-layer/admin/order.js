const express = require("express");
const router =  express.Router();

const modelforms = require('../../forms');
const serviceLayer = require('../../service-layer/Orders')

router.get('/', async function(req,res){
    const orders = await serviceLayer.serviceGetOrders();
    res.render('orders/index', {
        orders: orders.toJSON()
    } );
});

router.get('/add-order', async function(req,res){
    const allUser = (await userService.serviceGetOnlyUserType(2)).map( user => [ user.get('id'), user.get('username')]);
    // const allOrderStatus = (await orderStatusService)
    const orderForm = modelforms.createOrderForm(allUser);
    res.render('orders/create', {
        form: orderForm.toHTML(modelforms.bootstrapField),
    })
});

router.post('/add-order', async function(req,res){
    const allOrders = (await serviceLayer.serviceGetOrders()).map( order => [ order.get('id'), order.get('order_name')]); 
    allOrders.push([0,"No Parent Order"])
    allOrders.sort((a, b) => a[0] - b[0]);
    const orderForm = modelforms.createOrderForm(allOrders);
    orderForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_order_id === 0)
                delete form.data.parent_order_id;
            const order = await serviceLayer.serviceAddOrder(form);
            req.flash("success_messages", `New Order ${order.get('order_name')} has been created`)
            res.redirect("/admin/orders");
        },
        'empty': function(form) {
            res.render('orders/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('orders/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/update-order/:order_id', async function(req,res){
    const { order_id } = req.params;
    const order = await serviceLayer.serviceGetOrder(order_id)
    const allOrders = (await serviceLayer.serviceGetOrders()).map( order => [ order.get('id'), order.get('order_name')]); 
    allOrders.push([0,"No Parent Order"])
    allOrders.sort((a, b) => a[0] - b[0]);
    const orderForm = modelforms.createOrderForm(allOrders);
    for(let field in orderForm.fields)
    {
        orderForm.fields[field].value = order.get(field);
    }
    res.render('orders/update', {
        form: orderForm.toHTML(modelforms.bootstrapField),
        'order': order.toJSON(),
    })
});

router.post('/update-order/:order_id', async function(req,res){
    const { order_id } = req.params;
    const orderForm = modelforms.createOrderForm();
    orderForm.handle(req, {
        'success': async function(form) {
            if(form.data.parent_order_id === 0)
                delete form.data.parent_order_id;
            const order = await serviceLayer.serviceUpdateOrder(form, order_id);
            req.flash("success_messages", `Order ${order.get('order_name')} has been updated`)
            res.redirect("/admin/orders");
        },
        'empty': function(form) {
            res.render('orders/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        },
        'error': function(form) {
            res.render('orders/create', {
                form: form.toHTML(modelforms.bootstrapField)
            })
        }
    })
});

router.get('/delete-order/:order_id', async function(req,res){
    const { order_id } = req.params;
    const order = await serviceLayer.serviceGetOrder(order_id);

    res.render('orders/delete', {
        order: order.toJSON()
    })
})

router.post('/delete-order/:order_id', async function(req,res){
    const { order_id } = req.params;
    const response = await serviceLayer.serviceDelOrder(order_id);
    req.flash("success_messages", `Order ${response} has been Deleted`)
    res.redirect("/admin/orders");
})

module.exports = router;