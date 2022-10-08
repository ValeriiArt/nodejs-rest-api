const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const { addContactSchema } = require('../../schemas');

const update = async (req, res, next) => {
    try {
        const { error } = addContactSchema.validate(req.body);
        if (error) {
            throw RequestError(400, "Missing fields")
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw RequestError(404, error.message);
        };
        res.json(result);
    } catch (error) {
        next(error)
    }
};

module.exports = update;