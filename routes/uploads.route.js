const { Router } = require('express');
const { check } = require('express-validator');

const { uploader, updateImageCloudinary, retrieveImageCloudinary } = require('../controllers/upload.controller');
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
  retrieveImageCloudinary
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
  updateImageCloudinary
);

module.exports = router;
