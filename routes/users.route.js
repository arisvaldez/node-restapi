const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole } = require('../middlewares/db-validators');
const { fieldValidator } = require('../middlewares/fields-validator');

const {
  user_get,
  user_post,
  user_delete,
  user_put,
  user_patch,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', user_get);

router.post(
  '/',
  [
    check('email', 'this email is invalid').isEmail(),
    check(
      'password',
      'the password is required, and the minimun lenght is 6'
    ).isLength({ min: 6 }),
    check('name', 'the name is required').not().isEmpty(),
    //check('role', 'the is a invalid role').isIn(['ADMIN', 'USER']),
    check('role', 'the is a invalid role').custom(isValidRole),
    fieldValidator,
  ],
  user_post
);

router.put('/:id', user_put);

router.delete('/:id', user_delete);

router.patch('/', user_patch);

module.exports = router;
