const { request, response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = {
  users: 'users',
  categories: 'categories',
  products: 'products',
};

const allowedCollectionsKeys = Object.keys(allowedCollections);

const searchUsers = async (term = '', res = response) => {
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

const searchCategories = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      total: 1,
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({
    $or: [{ name: regex }],
    $and: [{ status: true }],
  });

  return res.json({
    total: categories.length,
    results: categories,
  });
};

const searchProducts = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({
      total: 1,
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({
    $or: [{ name: regex }],
    $and: [{ status: true }],
  }).populate('category', 'name');

  return res.json({
    total: products.length,
    results: products,
  });
};

const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (allowedCollectionsKeys.includes(collection)) {
    switch (collection) {
      case allowedCollections.users:
        return await searchUsers(term, res);
      case allowedCollections.categories:
        return await searchCategories(term, res);
      case allowedCollections.products:
        return await searchProducts(term, res);
    }
  }
  return res.status(400).json({
    msg: `${collection} not found in allowed: ${allowedCollectionsKeys.join(
      ', '
    )}`,
  });
};

module.exports = {
  search,
};
