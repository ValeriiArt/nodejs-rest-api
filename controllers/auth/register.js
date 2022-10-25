const bcrypt = require('bcrypt');
const { user } = require('../../models')
const { RequestError } = require('../../helpers');


const register = async (req, res) => {
   
    const { password, email } = req.body;

    const userReg = await user.User.findOne({email});
    if (userReg) {
        throw RequestError(409, "Email is use")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await user.User.create({ password: hashPassword, email });
    console.log(newUser);
    res.status(201).json({
        email: newUser.email,
        
    });
};

module.exports = register;

