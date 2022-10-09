const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const getListContacts = async (req, res) => {
    const result = await contacts.listContacts()
    if (!result) {
        throw RequestError(404, error.message)
    }
  res.json(result)
}

module.exports = getListContacts;