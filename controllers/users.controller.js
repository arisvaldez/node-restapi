const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const user_get = async (req = request, res = response) => {
  const { limit, from } = req.query;

  const _limit = !isNaN(limit) ? Number(limit) : 5;
  const _from = !isNaN(from) ? Number(from) : 0;

  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).skip(Number(_from)).limit(Number(_limit)),
  ]);

  res.json({ total, users });
};

const user_post = async (req = request, res = response) => {
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

const user_put = async (req = request, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...otherData } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    otherData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, otherData);

  res.json(user);
};

const user_delete = async (req = request, res = response) => {
  const { id } = req.params;
  const  uid  = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json({ user, uid });
};

const user_patch = (req = request, res = response) => {
  res.json({ ok: true, msg: 'Controller patch' });
};

module.exports = {
  user_get,
  user_delete,
  user_post,
  user_put,
  user_patch,
};
