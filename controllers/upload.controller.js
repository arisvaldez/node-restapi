const fs = require('fs');
const path = require('path');
const { response, request } = require('express');
const { fileUpload } = require('../uploader/file-upload');
const { User, Product } = require('../models');

const uploader = async (req = request, res = response) => {
  const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const filePath = await fileUpload(req.files, allowedFileExtensions);

  return res.json(filePath);
};

const updateImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

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

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img);

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
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

const retrieveImage = async (req = request, res = response) => {
  const { id, collection } = req.params;

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

  if (model && model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img);

    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  }
  
  const noImage = path.join(__dirname, '../assets/img/no-image.jpg');
  if (fs.existsSync(noImage)) {
    return res.sendFile(noImage);
  }
};

module.exports = {
  uploader,
  updateImage,
  retrieveImage,
};
