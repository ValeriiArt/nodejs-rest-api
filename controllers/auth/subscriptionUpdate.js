

const subscriptionUpdate = async (req, res) => {
    
    const result = await contact.Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw RequestError(404, error.message);
    };
    res.json(result);
};

module.exports = subscriptionUpdate;