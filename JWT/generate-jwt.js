const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    privateKey = process.env.SECRET_OR_PRIVATE_KEY;

    jwt.sign(
      payload,
      privateKey,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Can't create a JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
