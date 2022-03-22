const { response, request } = require('express');
const { fileUpload } = require('../uploader/file-upload');
const { User, Product } = require('../models');

const uploader = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json('No files were uploaded.');
    return;
  }
  const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const filePath = await fileUpload(req.files, allowedFileExtensions);

  return res.json(filePath);
};

const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json('No files were uploaded.');
    return;
  }

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      break;

    case 'products':
      model = await Product.findById(id);
      break;

    default:
      break;
  }
  const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const imgName = await fileUpload(
    req.files,
    allowedFileExtensions,
    collection
  );

  model.img = imgName;

  model.save();

  res.json(model);
};

module.exports = {
  uploader,
  updateImage,
};
