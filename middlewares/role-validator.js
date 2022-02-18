const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'It did try to valdiate the role without validated user',
    });
  }

  const { role } = req.user;

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `For perform this action, the role ADMIN is needed`,
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'It did try to valdiate the role without validated user',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `For perform this action, one of this roles is needed : ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
