const { Category, User, Role, Product } = require('../models');

const isValidRole = async (role = '') => {
  const hasRole = await Role.findOne({ role });
  if (!hasRole) {
    throw new Error('Unknow Role');
  }
};

const isUniqueEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`the email: ${email} is alredy in use`);
  }
};

const isExistUserById = async (id) => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new Error(`This id isn't exist, id:${id}`);
  }
};

const isExistCategoryById = async (id) => {
  const isExist = await Category.findById(id);

  if (!isExist) {
    throw new Error(`This id isn't exist, id:${id}`);
  }
};

const isExistProductById = async (id) => {
  const isExist = await Product.findById(id);

  if (!isExist) {
    throw new Error(`This id isn't exist, id:${id}`);
  }
};

const allowedCollections = async (collection = '', collections = []) => {
  if (!collections.includes(collection)) {
    throw new Error(
      `The Collection ${collection} isn't in allowed Collections`
    );
  }
  return true;
};

module.exports = {
  isValidRole,
  isUniqueEmail,
  isExistUserById,
  isExistCategoryById,
  isExistProductById,
  allowedCollections,
};
