const { verify } = require("jsonwebtoken");
require('dotenv').config()

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // Remove 'Bearer ' from the token string
            token = token.slice(7);
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    // Optionally, attach decoded information to the request object
                    req.user = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
};
