const Product = require("../models/Product");
const router = require("express").Router();

/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {
    const query = req.query.new;
    const category = req.query.category;

    try {
        let products;
        if (query) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (category) {
            products = await Product.find({categories: { $in: [category] }});
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json("An error has occured")
    }
})

/* GET A PRODUCT */
router.get("/find/:productid", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productid);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json("An error has occured")
    }
});


module.exports = router;