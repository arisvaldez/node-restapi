const Role = require('../models/role');

const isValidRole = async (role = '') => {
  const hasRole = await Role.findOne({ role });
  if (!hasRole) {
    throw new Error('el rol no existe');
  }
};

module.exports = { isValidRole };
