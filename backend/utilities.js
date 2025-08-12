const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        console.log("No token provided in request");
        return res.status(401).json({ error: true, message: "Access token required" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ error: true, message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
