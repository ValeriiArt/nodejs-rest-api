
const jwt = require('jsonwebtoken');

const { user } = require('../models');
const {RequestError}  = require('../helpers')
const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            throw RequestError(401);
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY);
            const userId = await user.User.findById(id);
            if (!userId || !userId.token) {
                throw Error("Unauthorized")
            }
            req.user = userId;
            next()
        } catch (error) {
            throw RequestError(401, error.message);
        }
    
    } catch (error) {
        next(error)
    }

};

module.exports = authenticate;