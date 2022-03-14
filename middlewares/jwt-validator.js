const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req = request, res = response, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ msg: 'Token not found' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    const user = await User.findById(uid);

    if (!user || !user.status) {
      return invalidTokenMsg(res);
    }

    req.authenticatedUser = user;

    next();
  } catch (error) {
    console.error(error);

    return invalidTokenMsg(res);
  }
};

const invalidTokenMsg = async (res) =>
  res.status(401).json({
    msg: 'invalid Token',
  });

module.exports = {
  jwtValidator,
};
