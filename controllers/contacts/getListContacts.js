const { contact } = require('../../models');
const { RequestError } = require('../../helpers');

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 , ...query} = req.query;
  const skip = (page - 1) * limit;
    const result = await contact.Contact.find({owner, ...query}, '-createdAt -updatedAt', {skip, limit})
    if (!result) {
        throw RequestError(404, error.message)
    }
  res.json(result)
}

module.exports = getListContacts;