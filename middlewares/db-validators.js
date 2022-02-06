const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const hasRole = await Role.findOne({ role });
  if (!hasRole) {
    throw new Error('Unknow Role');
  }
};

const isUniqueEmail = async (email = '') => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`the email: ${email} is alredy in use`);
  }
};

const isExistsUserById = async (id) => {
  const isExists = await User.findById(id);

  if (!isExists) {
    throw new Error(`This id isn't exists, id:${id}`);
  }
};

module.exports = {
  isValidRole,
  isUniqueEmail,
  isExistsUserById,
};
