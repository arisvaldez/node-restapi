const { Router } = require('express');
const { check } = require('express-validator');
const { uploader, updateImage } = require('../controllers/upload.controller');

const { fieldsValidator, allowedCollections } = require('../middlewares');

const router = Router();

router.post('/', uploader);

router.put(
  '/:collection/:id',
  [
    check('id', 'A valid Id is required').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    fieldsValidator,
  ],
  updateImage
);

module.exports = router;
