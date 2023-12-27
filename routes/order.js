const Order = require("../models/Order");
const router = require("express").Router();

/* CREATE AN ORDER */
router.post("/", async (req, res) => {
    const newOrder = new Order({
        email: req.body.email,
        products: req.body.products,
        amount: req.body.amount,
        address: req.body.address
    })
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json("An error has occured");
        console.log(error)
    }
})

module.exports = router;