const { fieldsValidator } = require('./fields-validator');
const { jwtValidator } = require('./jwt-validator');
const { fileValidator } = require('./file-validator');
const roleValidator = require('./role-validator');

module.exports = {
  fieldsValidator,
  jwtValidator,
  fileValidator,
  ...roleValidator,
};
