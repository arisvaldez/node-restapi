const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
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

module.exports = router;
