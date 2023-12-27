const router = require("express").Router();
const stripe = require("stripe")("sk_test_51OQDqQCg8KZTt8QFbAUyNymmEqHweFFTl93yjKqgnBScWZ93pu01zhDLv5QdZB9TQvQEYROsluxCQGiDdsz0XVZZ001XXdgZwS");

/* CHECKOUT WITH STRIPE */
router.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.lineItems,
            mode: req.body.mode,
            billing_address_collection: 'required',
            success_url: req.body.successUrl,
            cancel_url: req.body.cancelUrl,
            customer_email: req.body.customerEmail
        })
        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json("An error has occured")
    }
});

/* GET STRIPE CHECKOUT SESSION DETAILS */
router.post("/retrieve-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId)
        res.status(200).json(session)
    } catch (error) {
        res.status(500).json("An error has occured")
    }
})

module.exports = router;