const { Router } = require('express');
const { check } = require('express-validator');

const { retrieveImage } = require('../controllers/upload.controller');
const { uploader, updateImage } = require('../controllers/upload.controller');
const { fieldsValidator, fileValidator } = require('../middlewares');
const { allowedCollections } = require('../validators');

const router = Router();

router.get(
  '/:collection/:id',
  [
    check('id', 'A valid Id is required').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    fieldsValidator,
  ],
  retrieveImage
);

router.post('/', uploader);

router.put(
  '/:collection/:id',
  [
    check('id', 'A valid Id is required').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    fileValidator,
    fieldsValidator,
  ],
  updateImage
);

module.exports = router;
