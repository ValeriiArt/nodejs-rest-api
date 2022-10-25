const { contact }  = require('../../models');
const { RequestError } = require('../../helpers');

const updateFavorite = async (req, res) => {
    
    const { contactId } = req.params;
    const result = await contact.Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw RequestError(404, error.message);
    };
    res.json(result);
};

module.exports = updateFavorite;