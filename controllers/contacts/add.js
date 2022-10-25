const { contact } = require('../../models')


const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await contact.Contact.create({...req.body, owner});
    res.status(201).json(result);
};

module.exports = add;