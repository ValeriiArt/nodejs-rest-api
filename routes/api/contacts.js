const express = require('express');

const ctrl  = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { contact } = require('../../models');

const router = express.Router()


router.get('/', authenticate, ctrlWrapper(ctrl.getListContacts)); // Find by favorite

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(contact.schemas.addContactSchema), ctrlWrapper(ctrl.add))

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.remove));

router.put('/:contactId', authenticate, validateBody(contact.schemas.addContactSchema), isValidId, ctrlWrapper(ctrl.update));

router.patch('/:contactId/favorite', authenticate,
    validateBody(contact.schemas.updateFavoriteSchema),
    isValidId, ctrlWrapper(ctrl.updateFavorite));

module.exports = router
