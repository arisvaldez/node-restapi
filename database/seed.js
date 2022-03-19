import { genSaltSync, hashSync } from "bcryptjs";
import User from "../models/user";
import Role from "../models/role";

const userSeed = async () => {
  let count = 1;
  const salt = genSaltSync();
  const password = hashSync("123456", salt);

  while (count <= 15) {
    const user = new User({
      name: `User ${count}`,
      email: `user${count}@email.com`,
      password,
      role: "USER",
    });

    await user.save();

    count++;
  }
};

const roleSeed = async () => {
  const role = new Role({
    role: "ADMIN",
  });

  role.save();

  role = new Role({
    role: "USER",
  });

  role.save();
};

const seed = async () => {
  await roleSeed();
  await userSeed();
};

export default {
  seed,
};
