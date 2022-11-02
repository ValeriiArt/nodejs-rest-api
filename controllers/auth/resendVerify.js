
const { user } = require('../../models');

const { RequestError } = require('../../helpers');
const { sendEmail, createVerifyEmail } = require('../../services');



const resendVerify = async(req, res) => {
    const { email } = req.body;
    const userVerify = await user.User.findOne({ email });
    if (!userVerify) {
        throw RequestError(400, 'Bad Request')
    };
    const mail = createVerifyEmail(email, userVerify.verificationToken);
    await sendEmail(mail);
    res.json({
        message: "Verification email sent",
    })
};

module.exports = resendVerify;