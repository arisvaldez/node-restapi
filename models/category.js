import { Schema, model } from "mongoose";

const CategorySchema = Schema({
  name: { type: String, require: true, unique: true },
  status: { type: Boolean, default: true, require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

export default model("Category", CategorySchema);
