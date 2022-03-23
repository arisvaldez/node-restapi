const { fieldsValidator } = require('./fields-validator');
const { jwtValidator } = require('./jwt-validator');
const roleValidator = require('./role-validator');

module.exports = {
  fieldsValidator,
  jwtValidator,
  ...roleValidator,
};
