const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { user } = require('../../models');

const router = express.Router();

//signup
router.post('/register', validateBody(user.schemas.registerSchema), ctrlWrapper(ctrl.register));

//signin
router.post('/login', validateBody(user.schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authenticate, ctrlWrapper(ctrl.subscriptionUpdate));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

//logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));




module.exports = router;