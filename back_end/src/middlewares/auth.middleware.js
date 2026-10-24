const jwt = require("jsonwebtoken");

async function identifyUser(req,res,next){
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized access, Token not present, try logging in again!"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    }catch(err){
        return res.status(401).json({
            message: "unauthorized access, present token is wrong, try logging in agani",
            err: err.message
        })
    }

    req.user = decoded;

    next();
}

module.exports = {
    identifyUser
}