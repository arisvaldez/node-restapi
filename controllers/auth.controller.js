const { request, response } = require('express');
const User = require('../models/user');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User or Password invalid' });
    }

    res.json({ ok: true });
  } catch (ex) {
    console.error(ex);

    res
      .status(500)
      .json({ msg: 'An error was happen, contact with administrator' });
  }
};

module.exports = {
  login,
};
