const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

const updateImageCloudinary = async (req = request, res = response) => {
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
    const splitedName = model.img.split('/');
    const filename = splitedName[splitedName.length - 1];
    const [public_id] = filename.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const resp = await cloudinary.uploader.upload(tempFilePath);

  const { secure_url } = resp;

  model.img = secure_url;

  model.save();

  res.json(resp);
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

const retrieveImageCloudinary = async (req = request, res = response) => {
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
    return res.json(model.img);
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
  updateImageCloudinary,
  retrieveImageCloudinary,
};
