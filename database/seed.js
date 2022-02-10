const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const userSeed = async () => {
  let count = 1;
  const salt = bcryptjs.genSaltSync();
  const password = bcryptjs.hashSync('123456', salt);

  while (count <= 15) {
    const user = new User({
      name: `User ${count}`,
      email: `user${count}@email.com`,
      password,
      role: 'USER',
    });

    await user.save();

    count++;
  }
};

const roleSeed = async () => {
  const role = new Role({
    role: 'ADMIN',
  });

  role.save();

  role = new Role({
    role: 'USER',
  });

  role.save();
};

const seed = async () => {
  await roleSeed();
  await userSeed();
};

module.exports = {
  seed,
};
