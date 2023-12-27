const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        products: [
            {
                productid: { type: String },
                title: { type: String },
                color: { type: String },
                size: { type: String },
                quantity: { type: Number }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema)