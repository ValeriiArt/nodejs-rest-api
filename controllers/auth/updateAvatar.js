const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { user } = require('../../models');

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;

        const extention = originalname.split('.').pop();
        const filename = `${_id}.${extention}`;

        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        await user.User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatar;


