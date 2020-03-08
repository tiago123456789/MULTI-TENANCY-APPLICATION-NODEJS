const jwt = require("jsonwebtoken");

module.exports = {
    isAuthenticated: async (request, response, next) => {
        try {
            let accessToken = request.headers.authorization;
            if (!accessToken) {
                response.status(401).json({ error: "Informate accessToken." });
            }
    
            accessToken = accessToken.replace("Bearer ", "");
            await jwt.verify(accessToken, process.env.JWT_SECRET);
            next();
        } catch(error) {
            response.status(401).json({ error: "No access resource." })
        }
    }
}