const {Contact, schemas} = require('../../models/contact')
const { RequestError } = require('../../helpers');


const add = async (req, res) => {
    const { error } = schemas.addContactSchema.validate(req.body);
    if (error) {
        throw RequestError(400, "Missing required name field")
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

module.exports = add;