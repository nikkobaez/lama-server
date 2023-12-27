const Cart = require("../models/Cart");
const router = require("express").Router();
const { verifyTokenAndUser } = require("./token");

/* CREATE A CART */
router.post("/", async (req, res) => {
    const newCart = new Cart({
        userid: req.body.userid,
        products: req.body.products,
    });
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

/* GET A USERS CART */
router.get("/find/:userid", verifyTokenAndUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userid: req.params.userid });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

/* UPDATE A USERS CART */
router.put("/:userid/:cartid", verifyTokenAndUser, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.cartid, { $set: {products: req.body} }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

module.exports = router;
