const fs = require('fs').promises;
const path = require('path');
const ObjectID = require("bson-objectid");
 
const contactsPath = path.join(__dirname, 'contacts.json');
 
const update = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await update(contacts);
  return result;
}

async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = {
        id: ObjectID(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await update(contacts);
    return newContact;
}

// const updateContact = async (contactId, body) => {}
async function updateContact(contactId, {name, email, phone}) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      return null;
  };
  contacts[index] = { id: contactId, name, email, phone}
  await update(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
