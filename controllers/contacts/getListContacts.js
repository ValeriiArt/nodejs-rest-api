const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');

const getListContacts = async (req, res) => {
    const result = await Contact.find({}, '-createdAt -updatedAt')
    if (!result) {
        throw RequestError(404, error.message)
    }
  res.json(result)
}

module.exports = getListContacts;