const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileUpload = (files, allowedFileExtensions, folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const splitedName = file.name.split('.');
    const fileExtension = splitedName[splitedName.length - 1];

    if (!allowedFileExtensions.includes(fileExtension)) {
      return reject(`This file extension is not allowed`);
    }

    const tempName = `${uuidv4()}.${fileExtension}`;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });
  });
};



module.exports = {
  fileUpload,
};
