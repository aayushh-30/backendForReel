const { ErrorResponse } = require('../utils/responseTemplates');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json(new ErrorResponse('Unauthorized: No token provided', null));
        }

        const decodedToken =  await jwt.verify(token, process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(401).json(new ErrorResponse('Unauthorized: Invalid token', null));
        }

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json(new ErrorResponse('Something went wrong while token verification.', null));
    }
    
    next();
}

module.exports = { isLoggedIn };