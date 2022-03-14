const { request, response } = require('express');
const { json } = require('express/lib/response');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../JWT/generate-jwt');

const User = require('../models/user');
const { googleVerify } = require('../middlewares/');

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, img, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: 'none',
        img,
        google: true,
        role: 'USER',
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'This user is blocked, try contact with admin.',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    json.status(400).json({
      msg: "Can't verify token",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
