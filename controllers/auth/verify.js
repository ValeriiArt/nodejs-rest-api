
const { user } = require('../../models');

const { RequestError } = require('../../helpers');

const verify = async(req, res) => {
    const { verificationToken } = req.params;
    const userVerify = await user.User.findOne({ verificationToken });
    if (!userVerify) {
        throw RequestError(404, 'User not found');
    };
    await user.User.findByIdAndUpdate(userVerify._id, { verify: true, verificationToken: '' });
    res.json({
        message: 'Verification successful',
    })
};

module.exports = verify;
