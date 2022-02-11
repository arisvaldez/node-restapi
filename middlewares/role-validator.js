const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  const { role } = req.user;

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: 'For perform this action, the role ADMIN is needed',
    });
  }
  next();
};

module.exports = {
  isAdminRole,
};
