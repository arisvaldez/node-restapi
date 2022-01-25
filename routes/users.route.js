const { Router } = require('express');
const router = Router();

const {
  user_get,
  user_post,
  user_delete,
  user_put,
  user_patch,
} = require('../controllers/users.controller');

router.get('/', user_get);

router.post('/', user_post);

router.put('/:id', user_put);

router.delete('/:id', user_delete);

router.patch('/', user_patch);

module.exports = router;
