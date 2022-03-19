import { response, request } from "express";
import { Product } from "../models";

const create = async (req = request, res = response) => {
  const { price, category, description, name } = req.body;
  const _name = name.toUpperCase();
  const _user_id = req.authenticatedUser._id;
  const _price = !isNaN(price) ? Number(price) : 0.0;

  const newProduct = {
    name: _name,
    price: _price,
    category,
    description,
    user: _user_id,
  };

  const productInDb = await _isExistProductByName(_name);

  if (productInDb) {
    if (!productInDb.status) {
      productInDb.status = true;
      productInDb.user = _user_id;
      productInDb.category;
      productInDb.description;

      const product = await Product.findByIdAndUpdate(
        productInDb.id,
        productInDb,
        {
          new: true,
        }
      );

      return res.json(product);
    }
    return res
      .status(400)
      .json({ msg: `This name is already in use, name:${name}` });
  }

  const product = await new Product(newProduct);

  product.save();

  res.status(201).json(product);
};

const retrieve = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const _limit = !isNaN(limit) ? Number(limit) : 5;
  const _from = !isNaN(from) ? Number(from) : 0;

  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(_from))
      .limit(Number(_limit)),
  ]);

  res.json({ total, products });
};

const retrieveById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const update = async (req = request, res = response) => {
  const { status, user, ...data } = req.body;
  const { id } = req.params;
  const _user_id = req.authenticatedUser.__id;

  data.name = data.name.toUpperCase();
  data.user = _user_id;

  const productInDb = await _isExistProductByName(data.name);

  if (productInDb) {
    if (!productInDb.status) {
      productInDb.status = true;
      productInDb.user = _user_id;
      productInDb.category;
      productInDb.description;

      const product = await Product.findByIdAndUpdate(id, productInDb, {
        new: true,
      });

      return res.json(product);
    }
    return res
      .status(400)
      .json({ msg: `This name is already in use, name:${data.name}` });
  }

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const softDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(product);
};

const _isExistProductByName = async (name) => {
  name = name.toUpperCase();
  const isExist = await Product.findOne({ name });

  return isExist;
};

export default {
  create,
  retrieve,
  retrieveById,
  update,
  softDelete,
};
