const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const { addContactSchema } = require('../../schemas');

const add = async (req, res) => {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
        throw RequestError(400, "Missing required name field")
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
};

module.exports = add;