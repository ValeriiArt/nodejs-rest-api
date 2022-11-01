const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../../models')
const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
   
    const { password, email } = req.body;

    const userLogin = await user.User.findOne({email});
    if (!userLogin) {
        throw RequestError(401, "Email or password is wrong");
    };
    if (!userLogin.verify) {
        throw RequestError(401, "Email not verify");
    }
    const passwordCompare = await bcrypt.compare(password, userLogin.password);
    if (!passwordCompare) {
        throw RequestError(401, "Email or password is wrong");
    };
    const payload = {
        id: userLogin._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await user.User.findByIdAndUpdate(userLogin._id, {token})
    res.status(201).json({
        token,
    });
};

module.exports = login;