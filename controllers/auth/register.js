const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid')

const { user } = require('../../models')
const { RequestError, sendEmail, createVerifyEmail } = require('../../helpers');


const register = async (req, res) => {
   
    const { password, email } = req.body;

    const userReg = await user.User.findOne({email});
    if (userReg) {
        throw RequestError(409, "Email is use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await user.User.create({ password: hashPassword, email, avatarURL, verificationToken });
    const mail = createVerifyEmail(email, verificationToken);
    await sendEmail(mail);
    res.status(201).json({
        email: newUser.email,
        
    });
};

module.exports = register;

