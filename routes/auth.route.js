const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { fieldsValidator } = require('../middlewares/fields-validator');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'The email is required and valid.').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldsValidator,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'To be able to log in with google you need the id token').notEmpty(),
    fieldsValidator,
  ],
  googleSignIn
);

module.exports = router;
