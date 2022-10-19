const {Contact, schemas} = require('../../models/contact');
const { RequestError } = require('../../helpers');

const update = async (req, res) => {
    const { error } = schemas.addContactSchema.validate(req.body);
    if (error) {
        throw RequestError(400, "Missing fields")
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw RequestError(404, error.message);
    };
    res.json(result);
};

module.exports = update;