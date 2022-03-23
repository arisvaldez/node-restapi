const { googleVerify } = require('./google-verify');
const dbValidator = require('./db-validators');

module.exports = {
  googleVerify,
  ...dbValidator,
};
