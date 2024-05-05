const express = require("express");
const router = express.Router();

const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const serviceOrders = require("../service-layer/Orders");

router.get("/", (req,res) =>{
    console.log("test")
    res.send()
})

router.post('/process_payment', express.raw({type: 'application/json'}) , async (req, res) => {
    const payload = req.body;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    const sigHeader = req.headers['stripe-signature'];
    let event;
    try {
        event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret);
        if (event.type == 'checkout.session.completed') {
            let stripeSession = event.data.object;
            let order_id = stripeSession.client_reference_id
            const orders = await serviceOrders.servicePaymentCompleted(order_id);
        }
        res.send({ received: true });
           
    } catch (err) {
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    
});


module.exports = router;
