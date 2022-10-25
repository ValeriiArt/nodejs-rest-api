const {user} = require('../../models/')


const logout = async (req, res) => {
    const { _id } = req.user;
    await user.User.findByIdAndUpdate(_id, { token: '' });
    res.json({
        message: 'Logout success'
    })
};

module.exports = logout;