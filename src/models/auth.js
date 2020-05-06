const jwt = require('jsonwebtoken');
const User = require('./users');
const logger = require('../db/logger').logger;

const  auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decode._id, 'tokens.token': token});

        if(!user){
            throw new Error();
        }

        req.token = token;
       // console.log(req.token);
        req.user = user;
        logger.info("User Authenticated");
        next(); 
    } catch (error) {
        logger.error("Authentication Failed.");
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = auth;