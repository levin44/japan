const jwt = require('jsonwebtoken'); // Ensure jwt is required

const verifyjwt = (req, res, next) => {
    const token = req.headers["authorization"]; // Usually, the token is in the 'Authorization' header

    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: "Invalid token format" });
    }

    jwt.verify(tokenParts[1], process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Not Authenticated" });
        } else {
            req.username = decoded.username;
            next();
        }
    });
};

module.exports = verifyjwt; // Export the middleware for use in other files
