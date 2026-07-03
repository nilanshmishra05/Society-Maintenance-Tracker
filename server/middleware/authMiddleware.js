const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        console.log("========== AUTH MIDDLEWARE ==========");

        console.log("Authorization Header:");
        console.log(req.headers.authorization);

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        console.log("Token:");
        console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:");
        console.log(decoded);

        req.user = await User.findById(decoded.id).select("-password");

        console.log("User Found:");
        console.log(req.user);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        next();

    } catch (error) {
    console.log("AUTH ERROR");
    console.log(error);

    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Server/Database Error During Authentication"
    });
} 
};

module.exports = protect;