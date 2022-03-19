import { Schema, model } from "mongoose";

const RoleSchema = Schema({
  role: {
    type: String,
    require: true,
  },
});

export default model("Role", RoleSchema);
