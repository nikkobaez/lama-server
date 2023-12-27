const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

/* REGISTER A NEW USER */
router.post("/register", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        return res.status(400).json("A user with that email already exists")
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

/* LOGIN A CURRENT USER */
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json("A user with this email does not exist")
        }
        
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(400).json("The password you entered is incorrect")
        }
        
        const accessToken = JWT.sign(
            { 
                id: user._id, 
                isAdmin: user.isAdmin 
            },
            process.env.JWT_SEC,
            { expiresIn:"3d" }
        );

        const encryptedAccessToken = CryptoJS.AES.encrypt(accessToken, process.env.PASS_SEC).toString()

        res.status(200).json({accessToken: encryptedAccessToken, ...user._doc});
    } catch (error) {
        res.status(500).json("An error has occured");
    }
});

module.exports = router;