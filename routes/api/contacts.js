const express = require('express');

const { isValidId } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');

const router = express.Router()


router.get('/', ctrlWrapper(ctrl.getListContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.add))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.remove));

router.put('/:contactId', isValidId, ctrlWrapper(ctrl.update));

router.patch('/:contactId/favorite', isValidId, ctrlWrapper(ctrl.updateFavorite));

module.exports = router
