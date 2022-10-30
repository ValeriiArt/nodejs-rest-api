const fs = require('fs/promises');
const path = require('path');
const { user } = require('../../models');

const avatarsDir = path.join(__dirname, '..', '..', 'public', 'avatars');
console.log(avatarsDir);

const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        console.log(req.file)
        const { path: tempUpload, originalname } = req.file;

        const extention = originalname.split('.').pop();
        const filename = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl = path.join('avatars', filename);
        await user.User.findByIdAndUpdate(_id, { avatarUrl });
        res.json({
            avatarUrl,
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatar;