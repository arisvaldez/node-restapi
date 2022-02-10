const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../JWT/generate-jwt');

const User = require('../models/user');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'User or Password invalid - user not found' });
    }

    if (!user.status) {
      return res
        .status(400)
        .json({ msg: 'User or Password invalid - user inactive' });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: 'User or Password invalid - invalid Password' });
    }

    const token = await generateJWT(user.id);

    res.json({ user, token });
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
