const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

/* VERIFY THE JWT ACCESS TOKEN AND USER */
const verifyTokenAndUser = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (authHeader) {
        const accessToken = authHeader.split(" ")[1];

        const decryptedAccessToken = CryptoJS.AES.decrypt(accessToken, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        jwt.verify(decryptedAccessToken, process.env.JWT_SEC, (error, data) => {
            if (error) {
                res.status(401).json("Your authentication session has expired");
            }
            req.user = data
        });

        if (req.user.id === req.params.userid) {
            next()
        } else {
            res.status(400).json("You are not authenticated");
        }
    } else {
        return res.status(500).json("An error has occured");
    }
};

/* VERIFY THE JWT ACCESS TOKEN AND ADMIN */
const verifyTokenAndAdmin = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (authHeader) {
        const accessToken = authHeader.split(" ")[1];

        const decryptedAccessToken = CryptoJS.AES.decrypt(accessToken, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        jwt.verify(decryptedAccessToken, process.env.JWT_SEC, (error, data) => {
            if (error) {
                res.status(400).json("Your authentication session has expired");
            }
            req.user = data
        });

        if (req.user.isAdmin) {
            next()
        } else {
            res.status(400).json("You are not authenticated");
        }
    } else {
        return res.status(500).json("An error has occured");
    }
}

module.exports = { verifyTokenAndUser, verifyTokenAndAdmin };