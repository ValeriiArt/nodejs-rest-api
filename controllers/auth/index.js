const register = require('./register');
const verify = require('./verify');
const resendVerify = require('./resendVerify');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const subscriptionUpdate = require('./subscriptionUpdate');
const updateAvatar = require('./updateAvatar');


module.exports = {
    register,
    verify,
    resendVerify,
    login,
    getCurrent,
    logout,
    subscriptionUpdate,
    updateAvatar,
}