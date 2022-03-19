import { response, request } from 'express';
import { join } from 'path';

const uploadFiles = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json('No files were uploaded.');
    return;
  }

  const { file } = (sampleFile = req.files);

  const splitedName = file.name.split('.');
  const fileExtension = splitedName[splitedName.length - 1];

  const uploadPath = join(__dirname, '../uploads/', file.name);

  const allowedFileExtensions = ['png', 'jpg', 'jpeg', 'gif'];

  if(!allowedFileExtensions.includes(fileExtension)){
      return res.status(400).json({
          msg: `This file extension is not allowed`,
          allowdExtensions:`${allowedFileExtensions}`
      })
  }

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      msg: 'File uploaded to ' + uploadPath,
      extension: fileExtension,
    });
  });
};

export default {
  uploadFiles,
};
