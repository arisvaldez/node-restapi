const { fieldsValidator } = require('./fields-validator');
const { googleVerify } = require('./google-verify');
const { jwtValidator } = require('./jwt-validator');
const { isAdminRole, hasRole } = require('./role-validator');
const {
  isValidRole,
  isUniqueEmail,
  isExistUserById,
  isExistCategoryById,
  isExistProductById,
} = require('./db-validators');

module.exports = {
  fieldsValidator,
  googleVerify,
  jwtValidator,
  isAdminRole,
  hasRole,
  isValidRole,
  isUniqueEmail,
  isExistUserById,
  isExistCategoryById,
  isExistProductById,
};
