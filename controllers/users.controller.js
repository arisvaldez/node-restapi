const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const retrieve = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const _limit = !isNaN(limit) ? Number(limit) : 5;
  const _from = !isNaN(from) ? Number(from) : 0;

  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(_from)).limit(Number(_limit)),
  ]);

  res.json({ total, users });
};

const create = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Faltan Campos requeridos' });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...otherData } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    otherData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, otherData, { new: true });

  res.json(user);
};

const sofDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const uid = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({ user, uid });
};

module.exports = {
  retrieve,
  sofDelete,
  create,
  update,
};
