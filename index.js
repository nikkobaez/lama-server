const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const wishlistRoute = require("./routes/wishlist");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order")

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("MongoDB Connection Successful")
})
.catch((error) => {
    console.log(error)
});

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/wishlist", wishlistRoute);
app.use("/stripe", stripeRoute);
app.use("/order", orderRoute)

app.listen(process.env.PORT || 3001, () => {
    console.log("Listening To Port 3001")
});