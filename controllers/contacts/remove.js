const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
        throw RequestError(404, error.message);
    }
    res.json({ "message": "contact deleted" })
};

module.exports = remove;