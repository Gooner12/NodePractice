const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = async (req,res,next) => {
    // check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalidd');
    }
    const token = authHeader.split(' ')[1];

    try {
        // console.log(authHeader);
        const payload = jwt.verify(token, process.env.JWT_SECRET);

         // alternative code to getting the user. Performs same as the code in line 21     
        // const user = User.findById(payload.id).select('-password');
        // req.user = user;

        // attach the user to the job routes
        req.user = {userId:payload.userId, name:payload.name};
        next();
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication Invalids');
    }
}

module.exports = auth;