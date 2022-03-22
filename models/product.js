const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: { type: String, require: true, unique: true },
  status: { type: Boolean, default: true, require: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  price: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', require: true },
  description: { type: String },
  img: { type: String },
  isInStock: { type: Boolean, default: true },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model('Product', ProductSchema);
