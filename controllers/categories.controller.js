const { response, request } = require('express');
const { Category } = require('../models');

const create = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const newCategory = {
    name,
    user: req.authenticatedUser._id,
  };

  const categoryInDb = await _isExistCategoryByName(name);

  if (categoryInDb) {
    if (!categoryInDb.status) {
      categoryInDb.status = true;
      categoryInDb.user = req.authenticatedUser._id;

      const category = await Category.findByIdAndUpdate(
        categoryInDb.id,
        categoryInDb,
        {
          new: true,
        }
      );

      return res.json(category);
    }
    return res
      .status(400)
      .json({ msg: `This name is already in use, name:${name}` });
  }

  const category = await new Category(newCategory);

  category.save();

  res.status(201).json(category);
};

const retrieve = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const _limit = !isNaN(limit) ? Number(limit) : 5;
  const _from = !isNaN(from) ? Number(from) : 0;

  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(_from))
      .limit(Number(_limit)),
  ]);

  res.json({ total, categories });
};

const retrieveById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json(category);
};

const update = async (req = request, res = response) => {
  const { status, user, ...data } = req.body;
  const { id } = req.params;

  data.name = data.name.toUpperCase();
  data.user = req.authenticatedUser;

  const categoryInDb = await _isExistCategoryByName(data.name);

  if (categoryInDb) {
    if (!categoryInDb.status) {
      categoryInDb.status = true;
      categoryInDb.user = req.authenticatedUser._id;

      const category = await Category.findByIdAndUpdate(id, categoryInDb, {
        new: true,
      });

      return res.json(category);
    }
    return res
      .status(400)
      .json({ msg: `This name is already in use, name:${name}` });
  }

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const softDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(category);
};

const _isExistCategoryByName = async (name) => {
  name = name.toUpperCase();
  const isExist = await Category.findOne({ name });

  return isExist;
};

module.exports = {
  create,
  retrieve,
  retrieveById,
  update,
  softDelete,
};
