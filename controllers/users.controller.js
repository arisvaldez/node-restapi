const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const user_get = (req, res = response) => {
  const params = req.query;
  res.json({ ok: true, msg: 'Controller get', params });
};

const user_post = async (req = request, res = response) => {
 

  try {
    const { name, email, password, role } = req.body;
    const user = User({ name, email, password, role });

    const existsEmail = await User.findOne({ email });

    if (existsEmail) {
      res.status(400).json({
        msg: 'Ya este correo esta registrado',
      });
      return;
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();
    res.json({ ok: true, msg: 'Controller post', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'Faltan Campos requeridos' });
  }
};

const user_put = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: 'Controller put', id });
};

const user_delete = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: 'Controller del', id });
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
