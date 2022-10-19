const {Contact} = require('../../models/contact');
const { RequestError } = require('../../helpers');

const remove = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw RequestError(404, error.message);
    }
    res.json({ "message": "contact deleted" })
};

module.exports = remove;