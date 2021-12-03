const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'my secret signature', async (err, decodedToken) =>{
            if(err) {
                req.user = null;
                next();
            } else {
                // Add current user to the view
                let user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        });
    }else {
        req.user = null;
        next();
    }
} 

module.exports = { checkUser }