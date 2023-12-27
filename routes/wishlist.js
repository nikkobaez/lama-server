const Wishlist = require("../models/Wishlist");
const router = require("express").Router();
const { verifyTokenAndUser } = require("./token");

/* CREATE A WISHLIST */
router.post("/", async (req, res) => {
    const newWishlist = new Wishlist({
        userid: req.body.userid,
        products: req.body.products,
    });
    try {
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

/* GET A USERS WISHLIST */
router.get("/find/:userid", verifyTokenAndUser, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userid: req.params.userid });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

/* UPDATE A USERS WISHLIST */
router.put("/:userid/:wishlistid", verifyTokenAndUser, async (req, res) => {
    try {
        const updatedWishlist = await Wishlist.findByIdAndUpdate(req.params.wishlistid, { $set: {products: req.body} }, { new: true });
        res.status(200).json(updatedWishlist);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

module.exports = router;