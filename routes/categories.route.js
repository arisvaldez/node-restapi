const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidator, isAdminRole, fieldsValidator } = require('../middlewares');

const { isExistCategoryById } = require('../validators');

const {
  create,
  retrieve,
  retrieveById,
  update,
  softDelete,
} = require('../controllers/categories.controller');

const router = Router();

router.get('/', retrieve);

router.get(
  '/:id',
  [
    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistCategoryById),
    fieldsValidator,
  ],
  retrieveById
);

router.post(
  '/',
  [
    jwtValidator,
    check('name', 'the name is required').notEmpty(),
    fieldsValidator,
  ],
  create
);

router.put(
  '/:id',
  [
    jwtValidator,
    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistCategoryById),
    check('name', 'This name is required').notEmpty(),
    fieldsValidator,
  ],
  update
);

router.delete(
  '/:id',
  [
    jwtValidator,
    isAdminRole,
    check('id', 'This is a invalid ID').isMongoId(),
    check('id').custom(isExistCategoryById),
    fieldsValidator,
  ],
  softDelete
);

module.exports = router;
