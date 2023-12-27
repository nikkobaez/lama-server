const mongoose = require("mongoose");
const Product = require("./Product");

const WishlistSchema = new mongoose.Schema(
    { 
        userid: { type: String, required: true },
        products: [Product.schema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);