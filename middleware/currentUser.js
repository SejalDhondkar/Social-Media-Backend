const jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
    // get jwt token from request header
    let authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message: "Please use a valid token"});
    }
    
    const token = authHeader.split(" ")[1]; // Bearer <token>
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }catch (error) {
        return res.status(401).json({
            message: "Please use a valid token", 
            error
        });
    }
}

module.exports = currentUser;