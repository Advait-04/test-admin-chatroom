require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            error: "access denied",
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = verifyToken;
