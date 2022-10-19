const getListContacts = require('./getListContacts');
const getById = require('./getById');
const add = require('./add');
const remove = require('./remove');
const update = require('./update');
const updateFavorite = require('./updateFavorite');

module.exports = {
    getListContacts,
    getById,
    add,
    remove,
    update,
    updateFavorite,
}