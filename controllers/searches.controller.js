const { request, response } = require('express');
const { User } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = {
  users: 'users',
  categories: 'categories',
  products: 'products',
  roles: 'roles',
};

const allowedCollectionsKeys = Object.keys(allowedCollections);

const searchUser = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      total: 1,
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });
  return res.json({
    total: users.length,
    results: users,
  });
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (allowedCollectionsKeys.includes(collection)) {
    switch (collection) {
      case allowedCollections.users:
        await searchUser(term, res);
        break;
      case allowedCollections.categories:
        await searchUser(term, res);
        break;
      case allowedCollections.products:
        await searchUser(term, res);
        break;
      case allowedCollections.roles:
        await searchUser(term, res);
        break;
      default:
        return res.status(400).json({
          msg: `${collection} not found in allowed: ${allowedCollectionsKeys.join(
            ', '
          )}`,
        });
    }
  }
};

module.exports = {
  search,
};
