import { Schema, model } from "mongoose";

const UserSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  img: { type: String },
  role: { type: String, require: true, enum: ["ADMIN", "USER"] },
  status: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("User", UserSchema);
