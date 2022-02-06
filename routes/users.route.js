const { Router } = require('express');
const { check } = require('express-validator');

const {
  isValidRole,
  isUniqueEmail,
  isExistsUserById,
} = require('../middlewares/db-validators');

const {
  user_get,
  user_post,
  user_delete,
  user_put,
  user_patch,
} = require('../controllers/users.controller');

const { fieldsValidator } = require('../middlewares/fields-validator');

const router = Router();

router.get('/', user_get);

router.post(
  '/',
  [
    check('email', 'this email is invalid').isEmail(),
    check('email').custom(isUniqueEmail),
    check(
      'password',
      'the password is required, and the minimun lenght is 6'
    ).isLength({ min: 6 }),
    check('name', 'the name is required').not().isEmpty(),
    check('role', 'the is a invalid role').custom(isValidRole),
    fieldsValidator,
  ],
  user_post
);

router.put(
  '/:id',
  [
    check('id', 'This is an invalid Id').isMongoId(),
    check('id').custom(isExistsUserById),
    fieldsValidator,
  ],
  user_put
);

router.delete('/:id', user_delete);

router.patch('/', user_patch);

module.exports = router;
