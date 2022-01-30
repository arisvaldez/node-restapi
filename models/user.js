const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  img: { type: String },
  role: { type: String, require: true, enum: ['ADMIN', 'USER'] },
  status: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});


module.exports = model('User', UserSchema)