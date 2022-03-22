const { fieldsValidator } = require('./fields-validator');
const { googleVerify } = require('./google-verify');
const { jwtValidator } = require('./jwt-validator');
const roleValidator = require('./role-validator');
const dbValidator = require('./db-validators');

module.exports = {
  fieldsValidator,
  googleVerify,
  jwtValidator,
  ...roleValidator,
  ...dbValidator
};
